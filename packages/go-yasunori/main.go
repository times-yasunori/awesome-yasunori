package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "os"
  "strings"
)

type YasunoriObj struct {
  ID      int     `json:"id"`
  Title   *string `json:"title,omitempty"`
  Date    *string `json:"date,omitempty"`
  At      *string `json:"at,omitempty"`
  Senpan  *string `json:"senpan,omitempty"`
  Content *string `json:"content,omitempty"`
  Meta    *string `json:"meta,omitempty"`
}

func yasunoriToStr(obj YasunoriObj) string {
  return fmt.Sprintf("%3d %s %s", obj.ID, derefString(obj.Date), derefString(obj.Title))
}

func yasunoriToPrettyStr(obj YasunoriObj) string {
  var sb strings.Builder

  sb.WriteString(fmt.Sprintf("    id: %d\n", obj.ID))
  if obj.Date != nil {
    sb.WriteString(fmt.Sprintf("    date: %s\n", *obj.Date))
  }
  if obj.At != nil {
    sb.WriteString(fmt.Sprintf("    at: %s\n", *obj.At))
  }
  if obj.Senpan != nil {
    sb.WriteString(fmt.Sprintf("    senpan: %s\n", *obj.Senpan))
  }
  if obj.Meta != nil {
    sb.WriteString(fmt.Sprintf("    meta: %s\n", *obj.Meta))
  }
  sb.WriteString("\n")
  if obj.Content != nil {
    sb.WriteString(*obj.Content)
  }

  return sb.String()
}

func derefString(s *string) string {
  if s == nil {
    return ""
  }
  return *s
}

func fetchYasunori(path string) (interface{}, error) {
  url := fmt.Sprintf("https://api.yasunori.dev/%s", path)
  resp, err := http.Get(url)
  if err != nil {
    return nil, fmt.Errorf("failed to fetch: %w", err)
  }
  defer resp.Body.Close()

  if resp.StatusCode != http.StatusOK {
    return nil, fmt.Errorf("failed HTTP fetch: status code %d", resp.StatusCode)
  }

  var result interface{}
  if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
    return nil, fmt.Errorf("failed to decode response: %w", err)
  }

  return result, nil
}

func fetchRandom() (YasunoriObj, error) {
  result, err := fetchYasunori("awesome/random")
  if err != nil {
    return YasunoriObj{}, err
  }

  var obj YasunoriObj
  if err := mapToStruct(result, &obj); err != nil {
    return YasunoriObj{}, err
  }

  return obj, nil
}

func fetchByID(id int) (YasunoriObj, error) {
  result, err := fetchYasunori(fmt.Sprintf("awesome/%d", id))
  if err != nil {
    return YasunoriObj{}, err
  }

  var obj YasunoriObj
  if err := mapToStruct(result, &obj); err != nil {
    return YasunoriObj{}, err
  }

  return obj, nil
}

func fetchAll() ([]YasunoriObj, error) {
  result, err := fetchYasunori("awesome")
  if err != nil {
    return nil, err
  }

  var objs []YasunoriObj
  if err := mapToStruct(result, &objs); err != nil {
    return nil, err
  }

  return objs, nil
}

func mapToStruct(data interface{}, result interface{}) error {
  jsonData, err := json.Marshal(data)
  if err != nil {
    return fmt.Errorf("failed to marshal data: %w", err)
  }

  if err := json.Unmarshal(jsonData, result); err != nil {
    return fmt.Errorf("failed to unmarshal data: %w", err)
  }

  return nil
}

func actionDefault() {
  obj, err := fetchRandom()
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  fmt.Println(yasunoriToPrettyStr(obj))
}

func actionList() {
  objs, err := fetchAll()
  if err != nil {
    fmt.Println("Error:", err)
    return
  }
  for i := len(objs) - 1; i >= 0; i-- {
    fmt.Println(yasunoriToStr(objs[i]))
  }
}

func actionByIds(ids []int) {
  for _, id := range ids {
    obj, err := fetchByID(id)
    if err != nil {
      fmt.Println("Error:", err)
      continue
    }
    fmt.Println(yasunoriToPrettyStr(obj))
  }
}

func actionHelp() {
  fmt.Println(`usage:
    yasunori
    yasunori -list
    yasunori id [id...]`)
}

func main() {
  if len(os.Args) == 1 {
    actionDefault()
    return
  }

  switch os.Args[1] {
  case "-h", "--help":
    actionHelp()
  case "-list":
    actionList()
  default:
    ids := make([]int, 0)
    for _, arg := range os.Args[1:] {
      id := 0
      fmt.Sscanf(arg, "%d", &id)
      ids = append(ids, id)
    }
    actionByIds(ids)
  }
}

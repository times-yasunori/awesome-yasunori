import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAwesomeYasunori() {
  return useSWR<
    {
      id: number;
      title: string;
      content: string;
      date: string;
      at: string;
      senpan: string;
      meta: string;
    }[]
  >("https://api.yasunori.dev/awesome", fetcher, { revalidateOnFocus: false });
}

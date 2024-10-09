(ns yasunori.schema
  (:require
   [clojure.string :as str]
   [clj-yaml.core :as yaml]
   [schema.core :as s]))

(s/defschema YasunoriObj
  {:id s/Int
   :title (s/maybe s/Str)
   :date (s/maybe s/Str)
   :at (s/maybe s/Str)
   :senpan (s/maybe s/Str)
   :content (s/maybe s/Str)
   (s/optional-key :meta) (s/maybe s/Str)})

(s/defn yasunori->str :- s/Str
  [obj :- YasunoriObj]
  (apply format "%3d %s %s" ((juxt :id :date :title) obj)))

(s/defn yasunori->pretty-str :- s/Str
  [obj :- YasunoriObj]
  (str
   (str/join
    "\n"
    (->> (-> obj
             (select-keys [:id :date :at :senpan :meta])
             (yaml/generate-string :dumper-options {:flow-style :block}))
         str/split-lines
         (map #(str "    " %))))
   "\n\n"
   (:content obj)))

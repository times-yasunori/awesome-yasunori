(ns yasunori.api
  (:require
   [schema.core :as s]
   [clojure.data.json :as json]
   [yasunori.schema :as y.schema]))

(s/defn ^:private fetch-yasunori :- s/Any
  ([] (fetch-yasunori ""))
  ([path :- s/Str]
   (-> (slurp (format "https://api.yasunori.dev/%s" path))
       (json/read-str :key-fn keyword))))

(s/defn fetch-random :- y.schema/YasunoriObj
  []
  (fetch-yasunori "awesome/random"))

(s/defn fetch-by-id :- y.schema/YasunoriObj
  [id :- s/Int]
  (fetch-yasunori (format "awesome/%s" id)))

(s/defn fetch-all :- [y.schema/YasunoriObj]
  []
  (fetch-yasunori "awesome"))

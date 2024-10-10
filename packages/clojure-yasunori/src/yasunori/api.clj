(ns yasunori.api
  (:require
   [schema.core :as s]
   [clojure.data.json :as json]
   [babashka.http-client :as http]
   [yasunori.schema :as y.schema]))

(s/defn ^:private fetch-yasunori :- s/Any
  ([] (fetch-yasunori ""))
  ([path :- s/Str]
   (-> (http/get (format "https://api.yasunori.dev/%s" path))
       (#(if (= 200 (:status %))
           (:body %)
           (throw (ex-info "Failed HTTP fetch" %))))
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

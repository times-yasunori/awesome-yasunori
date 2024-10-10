(ns yasunori.core
  (:require
   [schema.core :as s]
   [yasunori.api :as y.api]
   [yasunori.schema :as y.schema])
  (:gen-class))

(s/defn action-default :- nil
  []
  (-> (y.api/fetch-random)
      y.schema/yasunori->pretty-str
      println))

(s/defn action-list :- nil
  []
  (->> (y.api/fetch-all)
       reverse                          ; TODO: ad-hoc hack to order list
       (map (comp println y.schema/yasunori->str))
       doall))

(s/defn action-by-ids :- nil
  [ids :- [s/Int]]
  (->> ids
       (map y.api/fetch-by-id)
       (map y.schema/yasunori->pretty-str)
       (map println)
       doall))

(defn -main
  "The entrypoint."
  [& args]
  (cond
    (nil? args) (action-default)
    (= "--list" (first args)) (action-list)
    :else (action-by-ids (map parse-long args))))

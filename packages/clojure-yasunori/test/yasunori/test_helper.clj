(ns yasunori.test-helper
  (:require
   [schema.core :as s]
   [yasunori.schema :as y.schema]))

(s/def dummy-yasunori-obj :- y.schema/YasunoriObj
  {:id 999
   :title "title"
   :date "2999-12-01"
   :at "vim-jp"
   :senpan "senpan"
   :content "content"
   :meta "meta"})

(s/defn yasunori-obj :- y.schema/YasunoriObj
  ([] (yasunori-obj {}))
  ([{:as m} :- {s/Keyword s/Any}]
  (merge dummy-yasunori-obj m)))

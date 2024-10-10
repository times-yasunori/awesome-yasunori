(ns yasunori.schema-test 
  (:require
   [clojure.string :as str]
   [clojure.test :as t]
   [schema.core :as s]
   [yasunori.schema :as y.schema]
   [yasunori.test-helper :as h]))

(s/defn str-line-join :- s/Str
  [& args :- [s/Str]]
  (str/join "\n" args))

(t/deftest yasunori->str-test
  (t/is (= "999 2999-12-01 title"
           (y.schema/yasunori->str (h/yasunori-obj)))))

(t/deftest yasunori->pretty-str
  (t/is (= (str-line-join "    id: 999"
                          "    date: '2999-12-01'"
                          "    at: vim-jp"
                          "    senpan: senpan"
                          "    meta: meta"
                          ""
                          "content")
           (y.schema/yasunori->pretty-str (h/yasunori-obj)))))

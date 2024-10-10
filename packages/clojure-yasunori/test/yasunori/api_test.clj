(ns yasunori.api-test
  (:require
   [babashka.http-client :as http]
   [clojure.data.json :as json]
   [clojure.test :as t]
   [schema.core :as s]
   [yasunori.api :as y.api]
   [yasunori.test-helper :as h]))

(s/defn res-ok :- {s/Keyword s/Any}
  [body :- s/Str]
  {:status 200
   :body body
   :headers {}})

(s/defn res-ok-json :- {s/Keyword s/Any}
  [obj :- {s/Keyword s/Any}]
  (res-ok (json/write-str obj)))

(t/deftest fetch-yasunori-test
  (with-redefs [http/get (constantly (res-ok "{}"))]
    (t/is (= {}
             (#'y.api/fetch-yasunori))))

  (with-redefs [http/get (constantly (res-ok-json (h/yasunori-obj)))]
    (t/is (= h/dummy-yasunori-obj
             (#'y.api/fetch-yasunori)))))

(t/deftest fetch-by-id-test
  (with-redefs [http/get (constantly (res-ok-json (h/yasunori-obj)))]
    (t/is (= h/dummy-yasunori-obj
             (y.api/fetch-by-id 1)))))

(t/deftest fetch-all-test
  (with-redefs [http/get (constantly (res-ok-json [(h/yasunori-obj)]))]
    (t/is (= [h/dummy-yasunori-obj]
             (y.api/fetch-all)))))

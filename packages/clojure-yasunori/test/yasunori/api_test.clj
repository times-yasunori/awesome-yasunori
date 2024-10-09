(ns yasunori.api-test
  (:require
   [clojure.data.json :as json]
   [clojure.test :as t]
   [yasunori.test-helper :as h]
   [yasunori.api :as y.api]))

(t/deftest fetch-yasunori-test
  (with-redefs [slurp (constantly "{}")]
    (t/is (= {}
             (#'y.api/fetch-yasunori))))

  (with-redefs [slurp (constantly (json/write-str (h/yasunori-obj)))]
    (t/is (= h/dummy-yasunori-obj
             (#'y.api/fetch-yasunori)))))

(t/deftest fetch-by-id-test
  (with-redefs [slurp (constantly (json/write-str (h/yasunori-obj)))]
    (t/is (= h/dummy-yasunori-obj
             (y.api/fetch-by-id 1)))))

(t/deftest fetch-all-test
  (with-redefs [slurp (constantly (json/write-str [(h/yasunori-obj)]))]
    (t/is (= [h/dummy-yasunori-obj]
             (y.api/fetch-all)))))

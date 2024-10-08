(ns user
  (:require
   [schema.core :as s]))

(s/set-fn-validation! true)
(alter-var-root #'*warn-on-reflection* (constantly true))

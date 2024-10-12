(ns ^:figwheel-hooks yasunori-block.core
  (:require
   [reagent.dom :as rdom]
   [yasunori-block.app :as y.app]))

(enable-console-print!)

(defn run []
  (rdom/render [y.app/app] (js/document.getElementById "app")))

(run)

(defn ^:after-load on-reload []
  (run))

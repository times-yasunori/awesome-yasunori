(ns ^:figwheel-hooks yasunori-block.core
  (:require
   [reagent.dom :as rdom]
   [yasunori-block.app :as y.app]))

(enable-console-print!)

(defn mount-app-element []
  (rdom/render [y.app/app] (js/document.getElementById "app")))

(mount-app-element)

(defn ^:after-load on-reload []
  (mount-app-element))

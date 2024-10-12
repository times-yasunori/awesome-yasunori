(ns yasunori-block.app
  (:require
   [reagent.core :as reagent]))

(defn Title []
  (println "title")
  [:h1 "cljs-yasunori-block"])

(defn Main []
  (println "main")
  (let [canvas (atom nil)
        is-running (reagent/atom false)]
    (fn []
      (println @is-running)
      [:div
       [:div
        [:canvas {:ref #(reset! canvas %)
                  :style {:width "1000px"
                          :height "500px"
                          :border "1px solid black"}}]]
       [:div {:style {:text-align "center"}}
        [:button {:on-click #(swap! is-running not)}
         (if @is-running
           "Restart YASUNORI"
           "Start YASUNORI")]]])))

(defn App []
  [:div {:style {:max-width "1000px"}}
   [Title]
   [Main]])

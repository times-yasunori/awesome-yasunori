(ns yasunori-block.app
  (:require
   [reagent.core :as reagent]))

(defn Timer [{:keys [:seconds-elapsed]}]
  [:div
   [:p "Seconds Elapsed: " seconds-elapsed "s"]])

(defn Title []
  (println "title")
  [:h1 "cljs-yasunori-block"])

(defn Main []
  (println "main")
  (let [canvas (atom nil)
        is-running (reagent/atom false)
        seconds-elapsed (reagent/atom 0)
        seconds-timeout-id (reagent/atom nil)
        start-game (fn []
                     (reset! is-running true)
                     (reset! seconds-timeout-id
                             (js/setInterval #(swap! seconds-elapsed inc) 1000)))
        end-game (fn []
                   (reset! is-running false)
                   (when @seconds-timeout-id
                     (js/clearInterval @seconds-timeout-id))
                   (reset! seconds-timeout-id nil))]
    (fn []
      (println @is-running)
      [:div
       [:div
        [Timer {:seconds-elapsed @seconds-elapsed}]]
       [:div
        [:canvas {:ref #(reset! canvas %)
                  :style {:width "1000px"
                          :height "500px"
                          :border "1px solid black"}}]]
       [:div {:style {:text-align "center"}}
        [:button {:on-click #(if (not @is-running)
                               (start-game)
                               (end-game))}
         (if (not @is-running)
           "Start YASUNORI"
           "Stop YASUNORI")]]])))

(defn App []
  [:div {:style {:max-width "1000px"}}
   [Title]
   [Main]])

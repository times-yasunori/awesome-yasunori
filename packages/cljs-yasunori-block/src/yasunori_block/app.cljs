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
        width 1000
        height 500
        is-running (reagent/atom false)
        state (reagent/atom {:ball {:x 0 :y 0 :dx 0 :dy 0}
                             :paddle {:width 0 :cx 0 :cy 0}
                             :blocks []})
        ticks (reagent/atom 0)
        seconds-elapsed (reagent/atom 0)
        seconds-timeout-id (reagent/atom nil)]
    (letfn [(draw-paddle [])
            (draw []
              (swap! ticks inc)
              (when-let [canvas @canvas]
                (let [ctx (. canvas getContext "2d")]
                  (. ctx clearRect 0 0 width height)
                  (draw-paddle)))
              (when @is-running
                (reagent.core/next-tick draw)))
            (start-game []
              (reset! is-running true)
              (reset! seconds-timeout-id
                      (js/setInterval #(swap! seconds-elapsed inc) 1000))
              (draw))
            (end-game []
              (reset! is-running false)
              (when @seconds-timeout-id
                (js/clearInterval @seconds-timeout-id))
              (reset! seconds-timeout-id nil))]
      (fn []
        [:div
         [:div
          [Timer {:seconds-elapsed @seconds-elapsed}]
          [:div
           "Ticks: " (print-str @ticks)]]
         [:div
          [:canvas {:ref #(reset! canvas %)
                    :style {:width (str width "px")
                            :height (str height "x")
                            :border "1px solid black"}}]]
         [:div {:style {:text-align "center"}}
          [:button {:on-click #(if (not @is-running)
                                 (start-game)
                                 (end-game))}
           (if (not @is-running)
             "Start YASUNORI"
             "Stop YASUNORI")]]]))))

(defn App []
  [:div {:style {:max-width "1000px"}}
   [Title]
   [Main]])

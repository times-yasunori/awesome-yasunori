(ns yasunori-block.app
  (:require
   [reagent.core :as reagent]))

(defn Timer [{:keys [:seconds-elapsed]}]
  [:div
   [:p "Seconds Elapsed: " seconds-elapsed "s"]])

(defn Title []
  (println "title")
  [:h1 "cljs-yasunori-block"])

(defn initial-state [width height]
  {:ball {:cx (/ width 2) :cy height :radius 5 :dx -4 :dy -5}
   :paddle {:cx (/ width 2) :cy height :width 200 :height 20}
   :blocks []})

(defn Main []
  (println "main")
  (let [canvas (atom nil)
        width 1000
        height 500
        is-running (reagent/atom false)
        state (reagent/atom (initial-state width height))
        ticks (reagent/atom 0)
        seconds-elapsed (reagent/atom 0)
        seconds-timeout-id (reagent/atom nil)]
    (letfn [(debounce []
              (= 0 (mod @ticks 50)))

            (draw-centered-rect [ctx {:keys [:cx :cy :width :height]}]
              (let [hw (/ width 2)
                    hh (/ height 2)]
                (. ctx fillRect (- cx hw) (- cy hh) width height)))

            (draw-centered-circle [ctx {:keys [:cx :cy :radius]}]
              (. ctx beginPath)
              (. ctx arc cx cy radius 0 (* js/Math.PI 2))
              (. ctx fill)
              (. ctx closePath))

            (draw-ball [ctx]
              (let [{:keys [:ball]} @state]
                (set! (.-fillStyle ctx) "0095DD")
                (draw-centered-circle ctx ball)))

            (draw-paddle [ctx]
              (let [{:keys [:paddle]} @state]
                (set! (.-fillStyle ctx) "#0095DD")
                (draw-centered-rect ctx paddle)))

            (draw-1 [ctx]
              ;; 初期化
              (. ctx clearRect 0 0 width height)

              ;; 現在の状態を描く
              (draw-paddle ctx)
              (draw-ball ctx)

              ;; 左右の壁との衝突 -> dxを符号反転
              (let [{:keys [:cx :radius :dx]} (:ball @state)]
                (when (or (< width (+ cx dx radius))
                          (< (+ cx dx (- radius)) 0))
                  (swap! state update-in [:ball :dx] -)))

              ;; 上の壁との衝突 -> dyを符号反転
              (let [{:keys [:cy :radius :dy]} (:ball @state)]
                (when (< (+ cy dy (- radius)) 0)
                  (swap! state update-in [:ball :dy] -)))

              ;; 下の壁との衝突
              ;;  - パドル: dyを符号反転
              ;;  - それ以外: ゲームオーバー
              (let [{:keys [:cx :cy :radius :dy]} (:ball @state)
                    {pcx :cx pwidth :width} (:paddle @state)
                    phw (/ pwidth 2) ; paddle-harf-width
                    plx (- pcx phw)  ; paddle-left-x
                    prx (+ pcx phw)  ; paddle-right-x
                    ]
                (when (< height (+ cy dy radius))
                  (if (and (< plx cx) (< cx prx))
                    (swap! state update-in [:ball :dy] -)
                    (end-game))))

              ;; ボールを動かす
              (swap! state update :ball #(-> %
                                             (update :cx + (:dx %))
                                             (update :cy + (:dy %)))))

            (draw []
              (when (debounce)
                (println @state))
              (when @canvas
                (draw-1 (. @canvas getContext "2d")))
              (when @is-running
                (swap! ticks inc)
                (reagent.core/next-tick draw)))

            (on-mouse-move [e]
              (when @is-running
                (swap! state update-in [:paddle :cx] (constantly (.-clientX e)))))

            (start-game []
              (reset! is-running true)
              (reset! seconds-timeout-id
                      (js/setInterval #(swap! seconds-elapsed inc) 1000))
              (reset! state (initial-state width height))
              (reset! ticks 0)
              (reset! seconds-elapsed 0)
              (draw))

            (end-game []
              (reset! is-running false)
              (when @seconds-timeout-id
                (js/clearInterval @seconds-timeout-id)
                (reset! seconds-timeout-id nil)))]
      (fn []
        [:div
         [:div
          [Timer {:seconds-elapsed @seconds-elapsed}]
          [:div
           "Ticks: " (print-str @ticks)]]
         [:div
          [:canvas {:ref #(reset! canvas %)
                    :width width
                    :height height
                    :style {:width (str width "px")
                            :height (str height "x")
                            :border "1px solid black"}
                    :on-mouse-move on-mouse-move}]]
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

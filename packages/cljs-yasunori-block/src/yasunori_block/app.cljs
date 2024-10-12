(ns yasunori-block.app
  (:require
   [cljs.math :as math]
   [reagent.core :as reagent]))

(def yasunori
  ["xxxx    xxxx  xxx       xxxxxxxx xx    xx  xxx   xxx   xxxxxx   xxxxxxx    xx"
   " xxxx  xxxx  xxxxx     xxxxxxxxxxxxx  xxxx xxxx  xxx  xxxxxxxx  xxx  xxx  xxxx"
   "  xxxxxxxx  xxx xxx   xxxxxxx   xxxx  xxxx xxxxxxxxx xxxx  xxxx xxx  xxx  xxxx"
   "   xxxxxx  xxx   xxx     xxxxx  xxxx  xxxx xxxxxxxxx xxxx  xxxx xxxxxxx   xxxx"
   "    xxxx  xxxxxxxxxxx   xxxxxxx xxxxxxxxxx xxx  xxxx xxxxxxxxxx xxx  xxx  xxxx"
   "    xxxx xxxx     xxxx xxxxxxx   xxxxxxxx  xxx   xxx  xxxxxxxx  xxx  xxxx xxxx"])

(defn Timer [{:keys [:seconds-elapsed]}]
  [:div
   [:p "Seconds Elapsed: " seconds-elapsed "s"]])

(defn h [arg]
  (/ arg 2))

(defn Title []
  (println "title")
  [:h1 "cljs-yasunori-block"])

(defn initial-state [width height]
  {:ball {:cx (h width) :cy height :radius 5 :dx -4 :dy -5}
   :paddle {:cx (h width) :cy height :width 200 :height 20}
   :speed-multiplier 1.2
   :speed-max 15
   :blocks (let [blpadding 60          ; block-left-padding
                 btpadding 100         ; block-top-padding
                 bwidth 10
                 bwidth-gap 1
                 bheight 10
                 bheight-gap 1]
             (->> yasunori
                 (map-indexed
                  (fn [iinx ielm]
                    (map-indexed
                     (fn [jinx jelm]
                       (when (= \x jelm)
                         {:cx (+ blpadding
                                 (* (+ bwidth bwidth-gap) jinx))
                          :cy (+ btpadding
                                 (* (+ bheight bheight-gap) iinx))
                          :width bwidth
                          :height bheight}))
                     ielm)))
                 flatten))})

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
               (. ctx fillRect (- cx (h width)) (- cy (h height)) width height))

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

            (draw-blocks [ctx]
              (let [{:keys [:blocks]} @state]
                (set! (.-fillStyle ctx) "0095DD")
                (doseq [elm blocks]
                  (draw-centered-rect ctx elm))))

            (draw-1 [ctx]
              ;; 初期化
              (. ctx clearRect 0 0 width height)

              ;; 現在の状態を描く
              (draw-paddle ctx)
              (draw-ball ctx)
              (draw-blocks ctx)

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
              (let [{:keys [:speed-max :speed-multiplier]} @state
                    {:keys [:cx :cy :radius :dx :dy]} (:ball @state)
                    {pcx :cx pwidth :width} (:paddle @state)]
                (when (< height (+ cy dy radius))
                  (if (and (< (- pcx (h pwidth)) cx) (< cx (+ pcx (h pwidth))))
                    (swap! state update :ball
                           #(let [relative-pos (/ (- cx pcx) (h width))
                                  reflect-rad (* relative-pos (/ math/PI 4))
                                  speed (min speed-max
                                             (* (math/sqrt (+ (* dx dx) (* dy dy)))
                                                speed-multiplier))]
                              (-> %
                                  (assoc :dx (* (math/sin reflect-rad) speed))
                                  (assoc :dy (- (* (math/cos reflect-rad) speed))))))
                    (end-game))))

              ;; ブロックとの衝突
              (let [{:keys [:dx :dy] :as ball} (:ball @state)
                    ;; FIXME: 面倒なのでボールが一旦動いたとして、その中心座標がブロックの内部にあるか検査することにする
                    ;;      : ボールがある程度速い場合、当たり判定なしにすり抜けることがある
                    ;;      : ボールがある程度大きい場合、半径を無視していることに気付く可能性がある
                    {:keys [:cx :cy]} (-> ball
                                          (update :cx + dx)
                                          (update :cy + dy))
                    before-blocks-cnt (count (:blocks @state))]
                (swap! state update :blocks
                       #(->> %
                             (filter
                              (complement
                               (fn [{bcx :cx bcy :cy bwidth :width bheight :height}]
                                 (and (< (- bcx (h bwidth)) cx) (< cx (+ bcx (h bwidth)))
                                      (< (- bcy (h bheight)) cy) (< cy (+ bcy (h bheight)))))))))

                ;; ボールが減っている場合、dyを符号反転
                (when-not (= before-blocks-cnt (count (:blocks @state)))
                  (swap! state update-in [:ball :dy] -)))

              ;; 終了判定
              (when (= 0 (count (:blocks @state)))
                (js/alert "Congratulations! :tada:")
                (end-game))

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

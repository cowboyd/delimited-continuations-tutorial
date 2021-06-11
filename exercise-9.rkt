#lang racket
(require racket/control)


;; This implements the state monad described in section
;; 2.10 They work, and I have no idea how yet

(define (get)
  (shift k (λ (state) ((k state) state))))

(define (tick)
  (shift k (λ (state) ((k) (+ 1 state)))))

(define (run-state thunk)
 ((reset (let ((result (thunk))) (λ (state) result))) 0))

(run-state
 (λ ()
   (tick)
   (tick)
   (let ((a (get)))
     (tick)
     (- (get) a))))

(run-state
 (λ ()
   (-
    (begin (tick) (get))
    (begin (tick) (get))
   )))
#lang algebraic/racket/base
(require algebraic/function)
(require algebraic/racket/base/forms)
(require racket/control)

(data Tree (Empty Node))

(data Result (Next Done))

(define (yield value) (shift k (Next value k)))

(define (start tree) (reset (walk tree) (Done)))

(define walk (function
 [(Empty) `()]
 [(Node left value right)
  (walk left)
  (yield value)
  (walk right)]))

;; Compare if two trees have the same sequence of values
; Our strategy is to get the next value from the two trees at
; the same time. If there is any mismatch, we immeditaley "return"
; where the return continuation is passed down and corresponds to
; the top-level reset.
(define (same-fringe t1 t2)
  (letrec ((loop (lambda (n1 n2 return)
                   (cond
                     [(and (Next? n1) (Next? n2))
                      (let ([(Next v1 k1) n1]
                            [(Next v2 k2) n2])
                        (if (= v1 v2)
                            (loop (k1) (k2) return)
                            (return #f)))]
                     [(and (Done? n1) (Done? n2)) (return #t)]
                     [else (return #f)]))))
    (reset (shift k (loop (start t1) (start t2) k)))))

(define tree1 (Node (Node (Empty) 1 (Empty)) 2 (Node (Empty) 3 (Empty))))
(define tree2 (Node (Empty) 1 (Node (Empty) 2 (Node (Empty) 3 (Empty)))))

(same-fringe tree1 tree2)
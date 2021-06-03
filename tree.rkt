#lang algebraic/racket/base
(require algebraic/function)
(require algebraic/racket/base/forms)
(require racket/control)

(data Tree (Empty Node))

(define tree1 (Node (Node Empty 1 Empty) 2 (Node Empty 3 Empty)))

(data Result (Next Done))

(define (yield value) (shift k (Next value k)))

(define (start tree) (reset (walk tree) (Done)))

(define (print-nodes tree)
  (letrec ((loop (function
                 [(Done) `()]
                 [(Next value k)
                 (println value)
                  (loop (k))])))
    (loop (start tree))))

(define walk (function
 [Empty `()]
 [(Node left value right)
  (walk left)
  (yield value)
  (walk right)]))

;;;(print-nodes tree1)

(define (add-nodes tree)
  (letrec ((loop (function
                  [(Done) 0]
                  [(Next value k) (+ value (loop (k)))])))
    (loop (start tree))))

(add-nodes tree1)
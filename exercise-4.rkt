#lang racket
(require racket/match)
(require racket/control)

;; multiply the contents of a list together
(define (times list) (reset
                      (match list
                        ; the empty list is the recursive base case
                        [(list) 1]
                        
                        ; when the head of any list is 0, just shift immediately
                        ; and discard the rest of the computation and produce 0
                        [(list-rest head rest) #:when (= head 0) (shift _ 0)]
                        
                        ; recursive step
                        [(list-rest head rest) (* head (times rest))])))

(times `(1 0 2 2 3))


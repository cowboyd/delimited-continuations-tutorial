#lang racket
(require racket/control)

;; this template function `f` has two "holes" that we fill in
; with captured continuations. The first hole takes a string
; and the second an integer. The integer is converted to a string
; beforehand.
(define (f) (reset (string-append
                    "hello "
                    (shift k k)
                    " "
                    (shift k (lambda (i) (k (number->string i))))
                    "!")))

;; this function takes multiple arguments and applies them
; successively to the continuations captured by the
; template function
(define (hello robot num)
  (((f) robot) num))

(hello "Johnny" 5)

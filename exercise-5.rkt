#lang racket
(require racket/control)

;; 5.1
;; Takes the argument, add 12, then multiplies by 5
; e.g. (k 2) = 70
(let ((k (reset (* 5 (+ (shift k k) (* 3 4))))))
  (k 2))

;; 5.2
;; Takes the argument, and if true, says "hello world", else yield "hi world"
;; e.g. (k false) = "hi world"
(let ((k (reset (string-append (if (shift k k) "hello" "hi") " world"))))
  (k false))

;; 5.3
;; Takes the argument, and returns it (after putting it into a cons
;; and then taking it out again ̄\_(ツ)_/̄
;; e.g. (k 5) = 5
(let ((k (reset (car (let ((x (shift k k))) (cons x x))))))
  (k 5))

;; 5.4
;; Returns the number of digits of the number argument, and adds 1
;; e.g. (k 100) = 4
(let ((k (reset (string-length (string-append "x" (number->string (shift k k)))))))
  (k 100))



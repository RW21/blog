---
title:  "レッツ継続引き渡しスタイル!!!"
date:   2020-07-12 22:00:00 +1000
categories: programming
tags: Scheme Racket Lisp
author: "RW"
excerpt: Little Schemerで初心者は絶対躓くやつ
---

## 継続引き渡しスタイルでつまづいた

Little SchemerというSchemeの本をやってて、継続引き渡しスタイルというのを見かけました。
最近のコンパイラの講義で少し触ったものだったので、自分にとって新しいものではないのですが、僕みたいなLisp初心者はまず躓くと思います。実際僕も躓きました。Little Schemerは継続引き渡しスタイルの導入で急に難易度上がります。

さて、継続引き渡しスタイルとは何だろう。コードを見て理解したほうが早いと思います。

```scheme
(define (multirember&co a lat k)
  (cond
    [(null? lat) (k '() '())]
    [(eq? (car lat) a) (multirember&co a (cdr lat)
                                       (lambda (newlat seen)
                                         (k newlat
                                              (cons (car lat) seen))))]
    [else (multirember&co a (cdr lat)
                          (lambda (newlat seen)
                            (k (cons (car lat) newlat) seen)))]))
```
(Friedman, Bibby and Matthias Felleisen, 2007)

これはLittle Schemerに載ってるコードなのですが、初心者は絶対ここで躓くと思うんですよね。いくら眺めても一体なにをするコードなのか分かりません。(頑張ればわかるかもしれないが。)

## 継続引き渡しスタイル

継続引き渡しスタイルは

```scheme
(+ (* 2 3) 1)
```

と書く代わりに、

```scheme
((lambda (a b k) (k (* a b)))
 2 3 (lambda (a1) (+ a1 1)))
```

のように書きます。

```scheme
(define (length l)
())



## えッ、`multirember&co` !?

ちなみに、`multirember`はこれです。リストから引数の要素を再帰で取り除く関数です。

```scheme
(define (multirember a lat)
  (cond
    [(null? lat) '()]
    [(eq? a (car lat)) (multirember a (cdr lat))]
    [else (cons (car lat) (multirember a (cdr lat)))]))
```

これにcollector関数を加えたのがmultimember&coです。

### Collector関数


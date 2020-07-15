---
title:  "レッツ継続引き渡しスタイル!!!"
date:   2020-07-12 22:00:00 +1000
categories: programming
tags: Scheme Racket Lisp
author: "RW"
excerpt: Little Schemerで初心者は絶対躓くやつ
---

## 継続引き渡しスタイルでつまづいた

Little SchemerというSchemeの本をやってて、継続引き渡しスタイルというのを見かけました。Continuation-passing style (CPS)ともいいます。
最近のコンパイラの講義で少し触ったものだったので、自分にとって新しいものではないのですが、僕みたいなLisp初心者はまず躓くと思います。実際僕も躓きました。Little Schemerは継続引き渡しスタイルの導入で急に難易度上がります。

本記事ではRacket言語を使います。

さて、継続引き渡しスタイルとは何だろう。コードを読んで理解するのが早いと思います。

```racket
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

```racket
(+ (* 2 3) 1)
```

と書く代わりに、

```racket
((lambda (a b k) (k (* a b)))
 2 3 (lambda (a1) (+ a1 1)))
```

のように書きます。

```racket
(define (length l)
    (cond
      [(null? l) 0]
      [else (add1 (length (cdr l)))]))
```

と書くのではなく、

```racket

(define (length-c l k)
  (if (null? l)
      (k 0)
      (length-c (cdr l) (lambda (cdr-len)
                          (k (add1 cdr-len))))))
```

と書きます。

これらに共通するのは、実際にコンパイラ(インタープリター)が処理する順番で書かれてるということです。
つまり、処理はすぐ行われるので、従来の再帰を使ったやり方と違って、スタックに積まれません。

継続引き渡しスタイルは呼び出される関数が、呼び出した関数に戻り値を受け取るための関数が必要です。
この関数のことをLittle Schemerに倣って、Collector関数と呼びます。

### `length-c`

処理を順番に追ってみます。再帰で変数が同じでわかりづらくなるので、変えてます。

```racket
(define (identity x) x)

> (length-c '(1 2 3) identity)
```

1._ 
```racket
(length-c '(2 3) 
	(lambda (x) (identity (add1 x))))
```

2.
```racket
(length-c '(3)
	(lambda (x1) (lambda (x)
		(identity (add1 x))) (add1 x1)))
```

3.
```racket
(length-c '()
	(lambda (x2) (lambda (x1)
		(lambda (x) (identity (add1 x))) (add1 x1))
			(add1 x2)))
```

4.
```racket
	((lambda (x2) (lambda (x1)
		(lambda (x) (identity (add1 x))) (add1 x1))
			(add1 x2)) 0)
```

5.
```racket
3
```

挙動的にはAccumulatorと似ていると思います。

## えッ、`multirember&co` !?

ちなみに、`multirember`はこれです。リストから引数の要素を再帰で取り除く関数です。

```racket
(define (multirember a lat)
  (cond
    [(null? lat) '()]
    [(eq? a (car lat)) (multirember a (cdr lat))]
    [else (cons (car lat) (multirember a (cdr lat)))]))
```

これにcollector関数を加えたのがmultimember&coです。

### Collector関数

`multirember&co`のCollector関数は

```racket
(define (last-length x y) (length y))
```

この関数を最初の引数として、`multirember&co`の処理をみてみます。`last-length`はcollector関数です。

1._ 
```racket
(multirember&co 3 '(3 1 3) last-length)
```

2.
```racket
(multirember&co 3 '(1 3)
	(lambda (newlat seen)
		(last-length newlat
		(cons 3 seen))))
```

3.
```racket
(multirember&co 3 '(3)
	(lambda (newlat1 seen1)
		(lambda (newlat seen)
			(last-length newlat
			(cons 3 seen)))
		(cons 1 newlat1) seen1))
```

4.
```racket
(multirember&co 3 '()
	(lambda (newlat2 seen2)
		(lambda (newlat1 seen1)
			(lambda (newlat seen)
			(last-length newlat
			(cons 3 seen)))
		(cons 1 newlat1) seen1)
	(cons 3 seen2)))
```

5.
```racket
((lambda (newlat2 seen2)
	(lambda (newlat1 seen1)
		(lambda (newlat seen)
		(last-length newlat
		(cons 3 seen)))
	(cons 1 newlat1) seen1)
(cons 3 seen2)) '() '())
```

6.
```racket
((lambda (newlat1 seen1)
	(lambda (newlat seen)
	(last-length newlat (cons 3 seen)))
	(cons 1 newlat1) seen1) '() '(3))
```

7.
```racket
((lambda (newlat seen)
	(last-length newlat (cons 3 (seen))))
'(1) '(3))
```

8.
```racket
(last-length newlat '(1) '(3 3))
; 2
```

このCollector関数は`a`と一致する要素を`seen`に追加して、一致しないのを`newlat`に追加します。
紙に書いて処理を追ってみると案外簡単に理解できます。

## 継続引き渡しスタイルは難読

もう少し複雑なCollector関数を使ってる関数です。二重再帰してます。

<script src="https://gist.github.com/RW21/13919fbdc1bf6e1c8580907cabcd4ff3.js"></script>

(Friedman, Bibby and Matthias Felleisen, 2007)


自分はLisp初心者なんで分からないんですが、Lisperはこういうコードを書くものなのでしょうか。

---
# layout: post
title:  "素数の並びからeが⁉"
date:   2019-07-13 22:00:00 +1000
categories: maths
tags: number_theory
author: "RW"
excerpt: "そんなわけなかった"
---
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML' async></script>

素数を素数の間($$P_{n+1}- P_{1}$$)が増加するように並べ続けたときの列の項の平均が
$$e$$に収束する(かもしれない)という投稿を[Reddit](https://www.reddit.com/r/math/comments/cbd0a7/found_e_in_the_primes_maybe/)の\r\maths板で見つけた。

# どういうこと?

$$3,5,7,11,13$$は素数の間隔が$$2,2,3,2$$というように増加してないからノーカウント。$$19,23,29$$はOK。このような素数の並びの項の合計の平均は$$e$$に収束するかも?という投稿。以下は977までの素数までの平均。

```
2 3 5 -> 3
7 11 -> 2
13 17 -> 2 
19 23 29
31 37
41 43 47 53
59 61 67
71 73 79
83 89 97
101 103 107
109 113 127
131 137
139 149
151 157
163 167 173
...
857 859 863 877
881 883 887 907
911 919 929
953 967
971 977

Total average value of each row: 163 / 60 = 2.71666... ≈ e
```

出典: [reddit](https://www.reddit.com/r/math/comments/cbd0a7/found_e_in_the_primes_maybe/)

まさかと思ってコメントを見てみたら、ここでネタバレしますけど、この数列は$$e$$に収束してなかった。

# なぜこうなるのか

違いも数もランダムな列で上のように平均をとると、$$e$$に収束する。上のような素数の数列はある程度違いも数もランダムな列と類似する。

$$a_i$$をランダムな数の数列で$$a_{n+1} - a_{n}$$を独立同分布でランダムな連続確立変数とする。上のように違いが増加するような数列だけをとると、列に項が2つある確率が$$1$$、3つある確率が$$1/2$$、4つある確率が$$1/6$$、5つある確率が$$1/24$$...という風な数列になる。

この数列の合計は$$\sum_{k=0}^{\infty} \frac{1}{k!} = e$$となる。

## 素数の並びはランダムではない

素数の平均の数列が$$e$$に収束しないということは、つまり素数の並びは完全にランダムではないといえるのではないだろうか?
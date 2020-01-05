---
title:  "カオスゲーム part 1"
date:   2019-01-04 22:00:00 +1000
categories: maths programming
tags: Python chaos fractal
author: "RW"
excerpt: "カオスゲームの紹介"
---

カオスゲームって知ってますか？カオスゲームは多角形内のランダムな点等をシードにするフラクタルの生成方法です。

## メソッド

1. 多角形内にランダムな点を取る。
2. 多角形のランダムな頂点から1.の点までの中心点を取る。
3. 1-2を繰り返す。

このメソッドで最もスタンダードなフラクタルが生成できます。

例えば正三角形をベースに上のメソッドを使うと[シェルピンスキーのギャスケット](https://ja.wikipedia.org/wiki/シェルピンスキーのギャスケット)がフラクタルとして出現します。

## シェルピンスキーのギャスケット

自家製の[カオスゲームフラクタル生成ライブラリ](https://github.com/RW21/fractal-art)で作ったシェルピンスキーのギャスケットです。

```python
cg = ChaosGameRegularPolygon(3)
cg.chaos_game(100000, 0.5)
cg.generate_heatmap(save='sample.png')
```

<img src="/assets/images/2020/chaos_game_1.png" alt="">

綺麗ですね(小並感)。

この自己相似的な図形を作る正規のメソッドは:

```
正三角形を用意する。
正三角形の各辺の中点を互いに結んでできた中央の正三角形を切り取る。
残った正三角形に対して2の手順を無限に繰り返す。
``` 

以上の通りです。

## シェルピンスキーのギャスケットが出現するわけ

<img src="/assets/images/2020/chaos_game_5.jpg" alt="">

最初の点がどこでも、ステップを踏むごとに小さな三角形に移動していきます。これが何ステップも進むとミクロな見えない点に入り、繰り返されるとシェルピンスキーのギャスケットが出来ます。

## 改変カオスゲーム

上記のカオスゲームを少しばかり変えると様々なフラクタルができます。

何を変えるか:
- 最初の多角形
- 中点を取るのではなく、何かの係数を取る
- 多次元への拡張
- ランダムな頂点を選ぶのではなく、選べる頂点を制限する
  - 現在の頂点は次選べない
  - 次の頂点は現在から2つ以上離れてないといけない
  - etc.

### 改変カオスゲームを試す

五角形で、係数を0.5、制限を現在の頂点は次選べないことにします。

```python
cg = ChaosGameRegularPolygon(5)
cg.chaos_game_restricted(1000000, 0.5, 2)
cg.generate_heatmap(save='sample.png')
```

<img src="/assets/images/2020/chaos_game_2.png" alt="">

綺麗ですね(小並感)。雪の結晶みたいなフラクタルができました。よく見ると、少し蜘蛛っぽくてキモいですね。

続いて、四角形で係数を0.5、制限を次の頂点は現在のから2つ離れてるのを選べないことにします。

```python
cg = ChaosGameRegularPolygon(4)
cg.chaos_game_restricted(1000000, 0.5, 2)
cg.generate_heatmap(save='sample.png')
```

<img src="/assets/images/2020/chaos_game_3.png" alt="">

綺麗ですね(小並感)。通常のカオスゲームでは四角形は以下のようなランダムなノイズしかできません。制限を設けると面白いフラクタルが色々出てきます。

```python
cg = ChaosGameRegularPolygon(4)
cg.chaos_game(1000000, 0.5)
cg.generate_heatmap(save='sample.png')
```

<img src="/assets/images/2020/chaos_game_4.png" alt="">

## 拡張

正多角形以外でカオスゲームをやったり、三次元、多次元の立体にカオスゲームを適用するとまた興味深いフラクタルが出てきます。これらは次回紹介したいと思います。
var store = [{
        "title": "ブログを始める",
        "excerpt":"Jenkyllでブログを始めることにした。ブログとはいっても個人的な備忘録などが中心になると思う。以下、ありきたりなブログの初投稿。   Jenkyll  静的サイトジェネレーターのJenkyllとGithubPagesを使った。Jenkyllで色々なテーマを漁ったが自分にしっくり来るものがなかった。自分がブログに求めるのはカテゴリ分けと過去の投稿を簡単に振り返られるブログだがこれに合うテーマはなかなかない。(静的サイトだと難しいのだろう。)   読者  このブログでは読者を想定しないであくまでも自分のためにブログを書こうと思う。他人の目を気にしてしまうとブログを書くのが億劫になるからだ。自分が毎日書いている日記を公開しないのは多分人の目が億劫だからかもしれない、もちろん自分の心情を晒しだしたくないという理由もあるが。   頻度  最低でも月イチの投稿を維持したい。  ","categories": ["personal"],
        "tags": [],
        "url": "http://localhost:4000/personal/%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AA%E3%81%A9/",
        "teaser": null
      },{
        "title": "Java並列化",
        "excerpt":"はじめに 本記事ではJavaにおける並列処理を主に個人の備忘録、勉強用として雑に記しています。気が向いたら更新します。主にJavaの並列化に使うキーワードを紹介しています。 並列処理 並列処理とは複数のスレッドを使って、メインスレッドとは別のスレッドでプロセスを行うことである。 並列処理における問題例 スレッドAがメモリを読み込んでいる間にスレッドBがそのメモリに書き込みをしたら、スレッドAで読み取られるのは新しい値か古い値か? 並列(concurrency) vs 並行(parallelism) 並列化と並行化という単語は同じマルチスレッドプログラミングにおいてよく使われますが、同一ではありません。 並列化 システムが複数のタスクを一度にこなすこと。 並行化 タスクがサブタスクに分散して一度に複数のサブタスクをこなすこと。 マルチスレッドプログラミング? 分散コンピューティング? 並行処理? 並列処理? マルチスレッドプログラミングや分散コンピューティングの概念は並列処理の概念とよく似ています。基本的には(並行処理, 並列処理)⊆マルチスレッディングです。本記事では並列処理しか扱いません。 なぜ並列処理するのか リソース利用の最適化 CPUのアイドルタイムを減らす。 プログラムの高速化 例えばサーバーからリクエストをlistenしてそのリクエストを処理するループがあるとする。 while(server is active){ // リクエストを受ける ... // リクエストを処理する } このループではリクエストを処理してる間は他のリクエストを受けれなくなっている。もしリクエストの処理のタスクを他のスレッドに受け渡せば、すぐにまたリクエストを受けれるようになり、高速化できる。 while(server is active){ // リクエストを受ける ... // リクエストを他スレッドに受け渡す } 主な並列処理モデル ここで紹介する並列処理モデルは分散コンピューティングシステムに使われるモデルと共通するのもあります。 Parallel Workers 出典: Jenkov.com...","categories": ["programming"],
        "tags": ["Java"],
        "url": "http://localhost:4000/programming/java%E4%B8%A6%E5%88%97%E5%8C%96/",
        "teaser": null
      },{
        "title": "素数の並びからeが⁉",
        "excerpt":"素数を素数の間()が増加するように並べ続けたときの列の項の平均が に収束する(かもしれない)という投稿をRedditの\\r\\maths板で見つけた。 どういうこと? は素数の間隔がというように増加してないからノーカウント。はOK。このような素数の並びの項の合計の平均はに収束するかも?という投稿。以下は977までの素数までの平均。 2 3 5 -&gt; 3 7 11 -&gt; 2 13 17 -&gt; 2 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173...","categories": ["maths"],
        "tags": ["number_theory"],
        "url": "http://localhost:4000/maths/e-from-prime/",
        "teaser": null
      },{
        "title": "無向グラフをクローンする",
        "excerpt":"無向グラフとは 無向グラフのデータ構造のクローンは簡単そうに見えて意外と簡単にはできません。下手に実装すると大変効率の悪いプログラムになってしまいます。 本記事ではクローンしたいグラフのノードの一つを入力にとって、それと同じグラフを持つ入力されたノードのコピーを返す関数を作ります。 有向グラフ/無向グラフ グラフには有向グラフと無向グラフがあり、無向グラフはノードとノードの間の辺が対面通行のグラフです。有向グラフはノード間の辺が一方通行のグラフです。 出典: e-education.psu.edu ノードの定義 まず、ノードを以下のように定義します。 # Python class Node: def __init__(self, val: int, neighbors: list): self.val = val self.neighbors = neighbors 使用するアルゴリズムとデータ構造 データ構造をクローンするにはまずそのデータ構造を走査する必要があります。例えば二次元配列のクローンをするには必ず全ての要素を走査します。グラフのようなデータ構造を走査するアルゴリズムにはBFS(幅優先探索)とDFS(深さ優先探索)というのがあります。グラフのデータ構造は深さより幅が大きいことを想定して、ここではBFSを使います。しかし、BFSでグラフを探索しただけではノード間の辺の関係を記録することは難しいです。そこで、ハッシュテーブルを使います。 BFS 根ノードを空のキューに加える。 ノードをキューの先頭から取り出し、以下の処理を行う。 ノードが探索対象であれば、探索をやめ結果を返す。 そうでない場合、ノードの子で未探索のものを全てキューに追加する。 もしキューが空ならば、グラフ内の全てのノードに対して処理が行われたので、探索をやめ”not found”と結果を返す。 2に戻る。 出典: wikipedia ハッシュテーブル 皆大好きな万能データ構造のハッシュテーブルです。とりあえずハッシュテーブルを使おうとするのはやめたほうがいいと思います。この問題ではハッシュテーブルはオリジナルのノードをキー、コピーを値として保存します。 アルゴリズム 入力されたノードをキューに追加し、ノードをキー、ノードのコピーを値としてハッシュテーブルに保存する。このクローニングはキューが空になるまで続けます。 ノードをキューから取得する。 取得したノードに隣接したノード(node.neighbors)をイテレートする。 隣接しているノードがハッシュテーブルにない場合は、そのノードのコピーをハッシュテーブルに追加し、そのノードをキューに追加する。 クローンされた隣接のノードを取得したノードのneighborsとして追加する。 Pythonコード from collections import deque...","categories": ["programming"],
        "tags": ["data_structure","algorithm"],
        "url": "http://localhost:4000/programming/%E7%84%A1%E5%90%91%E3%82%B0%E3%83%A9%E3%83%95%E3%82%92%E3%82%AF%E3%83%AD%E3%83%BC%E3%83%B3%E3%81%99%E3%82%8B/",
        "teaser": null
      },{
        "title": "C言語のメモリ領域",
        "excerpt":"C言語の変数は一体どこに保存されているのか   C言語の変数はすべてテキスト領域(code segment)、データ領域(静的領域、data segment)、そしてお馴染みのスタック領域とヒープ領域のどれかに保存されます。   領域に分ける理由   このような複数の領域に分割されたのは、アドレスレジスタがアクセスを許されるアドレス以上にアクセスをするという動機があります。メモリアドレスをずらして分割をすることで、16bitのアドレスレジスタは本来アクセスできる64kb以上の1mbのメモリ空間にアクセスができるようになります。ちなみに、このような仕組みが初めて実装されたのはIntel 8086 CPUからだそうです。      出典: brain.cc.kogakuin.ac.jp   テキスト領域   コード領域とも呼ばれます。この領域には機械語に翻訳されたCのプログラムが保存されます。テキスト領域のメモリは一番低番地に保存されます。テキスト領域の大きさはコンパイルが終わった後に決まり、固定されます。   なぜ最低番地?   ヒープとスタックのオーバーフローがテキスト領域を侵すのを防ぐため一番低番地になっています。   データ領域   データ領域にはグローバル変数と静的変数が保存されます。データ領域はさらに、初期化されてない変数(例:char c;)を保管するbssと初期化されてる変数(例:int i = 1;)を保存するdata領域に分けることができます。bssのほうがメモリの高番地に位置してます。データ領域の大きさもコンパイル後に固定されます。      出典: tcrosley   スタック/ヒープ領域   スタック領域はLIFO(last in first out)ですべてのローカル変数が保存されます。   ヒープには動的メモリ確保で確保されたメモリが高番地に向かって保存されます。スタックとヒープが重なるとOSにより、スタックオーバーフロー、もしくはmalloc()などの失敗が起こります。   TL;DR   メモリの低番地から順に:      テキスト領域 (機械語に翻訳されたC)   データ領域            data (初期化された変数)       BSS (初期化されてない変数)           ヒープ (動的メモリ)   スタック (ローカル変数)   標準、規格   このようなルールみたいな仕切りでCのメモリ管理は成り立っているのに、意外なことにC言語のメモリ領域は規格で定まってなく、実は業界が勝手作り上げた標準(らしきもの)なのです。なので、OSやコンパイラにより領域の使い方が違う場合があります。   参考     https://brain.cc.kogakuin.ac.jp/~kanamaru/lecture/MP/final/part06/node8.html   https://stackoverflow.com/questions/47301556/difference-between-stack-segment-and-uninitialized-data-segment   https://electronics.stackexchange.com/questions/237740/what-resides-in-the-different-memory-types-of-a-microcontroller/237759#237759   http://www.cs.uwm.edu/classes/cs315/Bacon/Lecture/HTML/ch10s04.html   https://en.wikipedia.org/wiki/Data_segment  ","categories": ["programming"],
        "tags": ["C"],
        "url": "http://localhost:4000/programming/C%E8%A8%80%E8%AA%9E%E3%81%AE%E5%A4%89%E6%95%B0/",
        "teaser": null
      },{
        "title": "GoのHTTPアプリをDockerイメージに",
        "excerpt":"SparkRDDのノードをDockerで運用することになったのでついでに久しぶりに使うDockerの基本的なところをおさらい。 Goで簡単なHTTPサーバーを立ち上げる package main import ( \"fmt\" \"net/http\" ) func main() { http.HandleFunc(\"/\", func(w http.ResponseWriter, r *http.Request) { _, _ = fmt.Fprint(w, \"Hello World\") }) _ = http.ListenAndServe(\":3000\", nil) } localhost:3000にHello Worldが表示されるはずです。 $ curl http://localhost:3000 # Hello World Dockerfileを書く FROM golang:latest COPY main.go /go/src WORKDIR /go/src RUN go build main.go...","categories": ["programming"],
        "tags": ["Go","Docker"],
        "url": "http://localhost:4000/programming/Go-http-docker/",
        "teaser": null
      },{
        "title": "C言語で複数プロセス間通信をする",
        "excerpt":"C99で複数のプロセスの間で通信をしたい!パイプを使いましょう。 子プロセスの準備 親から子プロセスへの出力用にファイルディスクリプタを準備します。 // N = num of child processes // 親プロセスの入力用のファイルディスクリプタ int fdOut[2 * N]; //　親プロセスの出力用ファイルディスクリプタ int fdIn[2 * N]; パイプを作る。 for (int i = 0; i &lt; N; i++) { pipe(&amp;fdOut[2*i]); pipe(&amp;fdIn[2*i]); } 各子プロセスを作る。dup2を使って子プロセスの標準出力、標準入力を親プロセスにつなげます。 // does not check for errors for (int i = 0; i &lt; N;...","categories": ["programming"],
        "tags": ["C"],
        "url": "http://localhost:4000/programming/C-processes-fork/",
        "teaser": null
      },{
        "title": "タスク管理をゲーム化するHabitica",
        "excerpt":"雑な記事。   最近Habiticaというタスク管理をゲーム化するサービスを使い始めました。普通のタスク管理サービスとしても多機能で気に入ってます。   少し分かりにくいのが今のところ唯一の問題ですが、それを踏まえても、今までで使ったタスク管理サービスの中では一番いいと思います。   ゲーム化   Habiticaではキャラクターを作って、タスクを完了することで経験値がもらえ、敵にダメージを与えられます。経験値でレベルアップしたり、クラスを選んだりすることができ、一般的なRPGゲームと同じです。   タスク   基本的にDaily、Todo、Habitの3種類のタスクを設定できます。      Daily            定期的にやらないとダメージを受けるタスク。           Todo            普通のTodo           Habit            習慣にしたいタスク。ネガティブな習慣(ダメージを受ける)とポジティブな習慣の2つがある。           ゲーム化するメリット   パーティーを組んでクエストをやる際に、自分の受けるダメージをパーティー全員が受けるので、連帯責任が生まれます。   ","categories": ["productivity"],
        "tags": ["app","game"],
        "url": "http://localhost:4000/productivity/task-management-habitica/",
        "teaser": null
      },{
        "title": "カオスゲーム part1",
        "excerpt":"カオスゲームとは多角形内のランダムな点等をシードにするフラクタルの生成方法です。 メソッド 多角形内のランダムな点を取る。 多角形のランダムな頂点から1.の点までの中心点を取る。 1-2を繰り返す。 このメソッドでスタンダードなフラクタルが生成できます。 例えば正三角形をベースに上のメソッドを使うとシェルピンスキーのギャスケットがフラクタルとして出現します。 シェルピンスキーのギャスケット 自家製のカオスゲームフラクタル生成ライブラリで作ったシェルピンスキーのギャスケットです。 cg = ChaosGameRegularPolygon(3) cg.chaos_game(100000, 0.5) cg.generate_heatmap(save='sample.png') 綺麗ですね(小並感)。 この自己相似的な図形を作る正規のメソッドは: 正三角形を用意する。 正三角形の各辺の中点を互いに結んでできた中央の正三角形を切り取る。 残った正三角形に対して2の手順を無限に繰り返す。 以上の通りです。 シェルピンスキーのギャスケットが出現するわけ 最初の点がどこでも、ステップを踏むごとに小さな三角形に移動していきます。これが何ステップも進むとミクロな見えない点に入り、繰り返されるとシェルピンスキーのギャスケットが出来ます。 改変カオスゲーム 上記のカオスゲームを少しばかり変えると様々なフラクタルができます。 何を変えるか: 最初の多角形 中点を取るのではなく、何かの係数を取る 多次元への拡張 ランダムな頂点を選ぶのではなく、選べる頂点を制限する 現在の頂点は次選べない 次の頂点は現在のから2つ以上離れてないといけない etc. 改変カオスゲームを試す 五角形で、係数を0.5、制限を現在の頂点は次選べないことにします。 cg = ChaosGameRegularPolygon(5) cg.chaos_game_restricted(1000000, 0.5, 2) cg.generate_heatmap(save='sample.png') 綺麗ですね\b(小並感)。雪の結晶みたいなフラクタルができました。よく見ると、少し蜘蛛っぽくてキモいですね。 続いて、四角形で係数を0.5、制限を次の頂点は現在のから2つ離れてるのを選べないことにします。 cg = ChaosGameRegularPolygon(4) cg.chaos_game_restricted(1000000, 0.5, 2)...","categories": ["maths","programming"],
        "tags": ["Python","chaos","fractal"],
        "url": "http://localhost:4000/maths/programming/chaos-game/",
        "teaser": null
      },{
        "title": "Creative Programming",
        "excerpt":"I’ve recently gotten into creative programming. After doing a part time job as a full stack web developer, I wanted to try something creative. I have been working on a personal project, a chaos game fractal generator library. My interest in generative art, artistic fractals has sparked as I see...","categories": ["programming"],
        "tags": ["creative","English"],
        "url": "http://localhost:4000/programming/creative-programming/",
        "teaser": null
      }]

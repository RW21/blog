var store = [{
        "title": "ブログを始める",
        "excerpt":"Jenkyllでブログを始めることにした。ブログとはいっても個人的な備忘録などが中心になると思う。以下、ありきたりなブログの初投稿。   Jenkyll  静的サイトジェネレーターのJenkyllとGithubPagesを使った。Jenkyllで色々なテーマを漁ったが自分にしっくり来るものがなかった。自分がブログに求めるのはカテゴリ分けと過去の投稿を簡単に振り返られるブログだがこれに合うテーマはなかなかない。(静的サイトだと難しいのだろう。)   読者  このブログでは読者を想定しないであくまでも自分のためにブログを書こうと思う。他人の目を気にしてしまうとブログを書くのが億劫になるからだ。自分が毎日書いている日記を公開しないのは多分人の目が億劫だからかもしれない、もちろん自分の心情を晒しだしたくないという理由もあるが。   頻度  最低でも月イチの投稿を維持したい。  ","categories": ["personal"],
        "tags": [],
        "url": "http://localhost:4000/personal/%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AA%E3%81%A9/",
        "teaser":null},{
        "title": "Java並列化",
        "excerpt":"はじめに 本記事ではJavaにおける並列処理を主に個人の備忘録、勉強用として雑に記しています。気が向いたら更新します。主にJavaの並列化に使うキーワードを紹介しています。 並列処理 並列処理とは複数のスレッドを使って、メインスレッドとは別のスレッドでプロセスを行うことである。 並列処理における問題例 スレッドAがメモリを読み込んでいる間にスレッドBがそのメモリに書き込みをしたら、スレッドAで読み取られるのは新しい値か古い値か? 並列(concurrency) vs 並行(parallelism) 並列化と並行化という単語は同じマルチスレッドプログラミングにおいてよく使われますが、同一ではありません。 並列化 システムが複数のタスクを一度にこなすこと。 並行化 タスクがサブタスクに分散して一度に複数のサブタスクをこなすこと。 マルチスレッドプログラミング? 分散コンピューティング? 並行処理? 並列処理? マルチスレッドプログラミングや分散コンピューティングの概念は並列処理の概念とよく似ています。基本的には(並行処理, 並列処理)⊆マルチスレッディングです。本記事では並列処理しか扱いません。 なぜ並列処理するのか リソース利用の最適化 CPUのアイドルタイムを減らす。 プログラムの高速化 例えばサーバーからリクエストをlistenしてそのリクエストを処理するループがあるとする。 while(server is active){ // リクエストを受ける ... // リクエストを処理する } このループではリクエストを処理してる間は他のリクエストを受けれなくなっている。もしリクエストの処理のタスクを他のスレッドに受け渡せば、すぐにまたリクエストを受けれるようになり、高速化できる。 while(server is active){ // リクエストを受ける ... // リクエストを他スレッドに受け渡す } 主な並列処理モデル ここで紹介する並列処理モデルは分散コンピューティングシステムに使われるモデルと共通するのもあります。 Parallel Workers 出典: Jenkov.com...","categories": ["programming"],
        "tags": ["Java"],
        "url": "http://localhost:4000/programming/java%E4%B8%A6%E5%88%97%E5%8C%96/",
        "teaser":null},{
        "title": "素数の並びからeが⁉",
        "excerpt":"素数を素数の間()が増加するように並べ続けたときの列の項の平均が に収束する(かもしれない)という投稿をRedditの\\r\\maths板で見つけた。 どういうこと? は素数の間隔がというように増加してないからノーカウント。はOK。このような素数の並びの項の合計の平均はに収束するかも?という投稿。以下は977までの素数までの平均。 2 3 5 -&gt; 3 7 11 -&gt; 2 13 17 -&gt; 2 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173...","categories": ["maths"],
        "tags": ["number_theory"],
        "url": "http://localhost:4000/maths/e-from-prime/",
        "teaser":null}]

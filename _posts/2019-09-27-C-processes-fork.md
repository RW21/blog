---
title:  "C言語で複数プロセス間通信をする"
date:   2019-09-27 22:00:00 +1000
categories: programming
tags: C
author: "RW"
excerpt: "`fork` `pipe` を使ってプロセス間入出力"
---

C99で複数のプロセスの間で通信をしたい!パイプを使いましょう。

## 子プロセスの準備

親から子プロセスへの出力用にファイルディスクリプタを準備します。

```C
// N = num of child processes

// 親プロセスの入力用のファイルディスクリプタ
int fdOut[2 * N];

//　親プロセスの出力用ファイルディスクリプタ
int fdIn[2 * N];
```

パイプを作る。

```C
for (int i = 0; i < N; i++) {
    pipe(&fdOut[2*i]);
    pipe(&fdIn[2*i]);
}
```

各子プロセスを作る。`dup2`を使って子プロセスの標準出力、標準入力を親プロセスにつなげます。

```C
// does not check for errors

for (int i = 0; i < N; ++i) {
    if (!fork()) {
        // 子プロセスのstdoutを入力用パイプにつなぐ
        dup2(fdIn[i + 1], 1);
        // 子プロセスのstdoutを入力用パイプにつなぐ
        dup2(fdOut[i], 0);

        // 違うプログラマを立ち上げる
        execvp(executableLocation, argArray);
    }
}
```

これで子プロセスの準備は完了。

## 子プロセスへ出力

親から子プロセスへ文字列を送る。

```C
// childNumber = n番目の子プロセス

char* string = "Hello World";

write(fdOut[childNumber * 2 + 1], string, sizeof(string));
```

もしくは、ファイルディスクリプタをファイルポインタとして開いてf系関数を使うことができます。

```C
FILE *file = fdopen(fdOut[childNumber * 2 + 1], "w");

fprintf(file, "Hello World");

fclose(file);
```

子プロセスは標準入力が親プロセスとつながってるので、fgetsを使って入力文字列を受け取ることができます。

```
char *string = malloc(sizeof(char) * 128);

fgets(string, 128, stdin);
```

## 子プロセスから入力

子から親プロセスへ文字列を送る。子プロセスは`stdout`が親プロセスとつながってるので`fprint`で簡単に送れます。

```C
fprint("Bye World");
```

親プロセスは以下のように子プロセスから受け取ります。

```C
char* string = malloc(sizeof(char) * 128);
read(fdIn[player * 2], string, sizeof(string));
```

もしくは上記と同じようにファイルポインタとして開いて扱うことができます。
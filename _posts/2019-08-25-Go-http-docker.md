---
title:  "GoのHTTPアプリをDockerイメージに"
date:   2019-08-25 22:00:00 +1000
categories: programming
tags: Go Docker
author: "RW"
excerpt: "Dockerfileを作ろう"
---

SparkRDDのノードをDockerで運用することになったのでついでに久しぶりに使うDockerの基本的なところをおさらい。

## Goで簡単なHTTPサーバーを立ち上げる

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, _ = fmt.Fprint(w, "Hello World")
	})

	_ = http.ListenAndServe(":3000", nil)
}
```

[localhost:3000](http://localhost:3000/)にHello Worldが表示されるはずです。

```bash
$ curl http://localhost:3000
# Hello World
```

## Dockerfileを書く

```dockerfile
FROM golang:latest

COPY main.go /go/src
WORKDIR /go/src

RUN go build main.go

EXPOSE 3000

CMD ["./main"]
```

続く...
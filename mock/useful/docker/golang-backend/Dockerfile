FROM golang:alpine as builder

WORKDIR /go/release
RUN apk update && apk add tzdata

COPY go.mod ./go.mod
RUN go mod tidy
COPY . .
RUN pwd && ls

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -a -installsuffix cgo -o re-chinese main.go

FROM alpine

COPY --from=builder /go/release/re-chinese /

EXPOSE 8080

ENTRYPOINT ./re-chinese -c

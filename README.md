= Grafana Icons

This is a repository that manages the icons used in grafana



=== generate bundle

list the iconst that should be bundled in:  `cmd/genbundle/bundle.txt` then:

```
go run cmd/genbundle/main.go > iconBundle.ts
```

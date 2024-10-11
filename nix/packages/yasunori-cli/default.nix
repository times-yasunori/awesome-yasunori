{
  writers,
  awesome-yasunori,
}:
writers.writeNu "/bin/yasunori-cli" ''
  open ${awesome-yasunori}/yasunori.toml | get yasunori | get content | get (random dice --sides (($in | length) - 1) | get 0)
''

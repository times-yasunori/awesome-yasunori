{
  writers,
  awesome-yasunori,
}:
writers.writeNuBin "yasunori-cli" ''
  open ${awesome-yasunori}/yasunori.toml | get yasunori | get content | get (random dice --sides (($in | length) - 1) | get 0)
''

package main

import (
	"flag"
	"fmt"
)

func main() {
	fmt.Println("Hello world!")

	flag.Parse()
	arg := flag.Arg(0)
	fmt.Println("arg:", arg)
}

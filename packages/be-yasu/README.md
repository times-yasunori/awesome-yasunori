## `be-yasu`

> It should be yasunori!!

Replace the noun with yasunori

## Installation
1. Clone this repository
2. Run `cargo build --release` and get the binary of this cli
3. Set the environment variable `BE_YASU_PATH` to the path of the dictionary file
4. Run the following command
```bash
be-yasu --help
```

## Usage
### raw mode
```bash
be-yasu <input>
```
parse `<input>` and replace the noun with yasunori
### interactive mode 
```bash
be-yasu -i
```
![](./images/be-yasu.png)
interactively parse input

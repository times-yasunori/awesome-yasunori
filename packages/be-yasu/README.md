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

> [!NOTE]
> Dictionary should be downloaded from [this release page](https://github.com/daac-tools/vibrato/releases/tag/v0.5.0).
> 
> Download the dictionary and extract it with the `tar xvf` command.
> This will give you a `zstandard` encoded dictionary. The process of extracting the `zstandard` encoded dictionary will be done automatically.


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

# Yasunori.NET

## Syntax

```
Yasunori
Yasunori {-l | --list}
Yasunori {-i | --image}
Yasunori id [id...]
Yasunori {-i | --image} id [id...]
```

### Non arguments

Show ramdom

- API: `https://api.yasunori.dev/awesome/random`
- Image: `https://image.yasunori.dev/ogp`

### `-l` or `--list`

Show yasunori entries.

- API: `https://api.yasunori.dev/awesome`

### `-i` or `--image`

Get OGP image and show.
(Required Sixel supported terminal)

### id

Show specified entry of ID number.

- API: `https://api.yasunori.dev/awesome/{id}`
- Image: `https://image.yasunori.dev/ogp?id={id}`

## Build

```bash
dotnet build -p:Configuration=Release
```


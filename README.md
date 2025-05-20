# @randajan/regex-parser

[![NPM](https://img.shields.io/npm/v/@randajan/regex-parser.svg)](https://www.npmjs.com/package/@randajan/regex-parser) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Convert between JavaScript **RegExp** objects and their `/pattern/flags` string form — simple, safe and lightweight.

---

## Install

```bash
npm i @randajan/regex-parser
```

---

## Quick use

```js
import { rgxToStr, strToRgx } from "@randajan/regex-parser";
// or: const { rgxToStr, strToRgx } = require("@randajan/regex-parser");

const re  = /hello\/world/i;
const str = rgxToStr(re);   // "/hello\\/world/i"
const re2 = strToRgx(str);  // ⇢ /hello\/world/i
```

---

## API

### `rgxToStr(regexp) → string`

Serialises a `RegExp` into `/pattern/flags`, escaping **only** those `/` that are not already escaped.

### `strToRgx(string, strict = false) → RegExp`

* **If** the string matches `/pattern/flags`, parse it.
* **Else**  
  * when **strict = false** (default) return a safe literal regex with the text escaped,
  * when **strict = true** throw `SyntaxError`.

```js
strToRgx("/\d+/g");              // → /\d+/g
strToRgx("user.name?");           // → /user\.name\?/
strToRgx("user.name?", true);     // throws
```

---

## Example round‑trip test

```js
const originals = [/foo\/bar/i, /a+b*c?.(x|y)/g];

originals.forEach(r => {
  const r2 = strToRgx(rgxToStr(r));
  console.assert(r2.source === r.source && r2.flags === r.flags);
});
```

---

### Why another regex helper?

* **Zero dependencies** – <1 kB min+gzip  
* **Predictable** – strict mode prevents silent surprises  
* **Universal** – Node ≥12 & all modern browsers

---

## License

MIT © [randajan](https://github.com/randajan)

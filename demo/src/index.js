
import { strToRgx, rgxToStr } from "../../dist/esm/index.mjs";

const originals = [
  /hello\/world/i,
  /a+b*c?.(x|y)/gi,
  new RegExp("foo/bar"),          // původně neescapované /
  /\/literal-slash\//,            // vzor s více escapovanými lomítky
];

for (const re of originals) {
  const str = rgxToStr(re);
  const round = strToRgx(str);

  const ok = round.source === re.source && round.flags === re.flags;
  console[ok ? "log" : "error"](
    `${ok ? "✔" : "✘"} ${re}  →  ${str}  →  ${round}`
  );
}
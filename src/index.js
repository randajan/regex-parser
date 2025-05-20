const _regex = /^\/((?:\\.|[^\\/])+)\/([a-z]*)$/i;
const _regexEsc = /[.*+?^${}()|[\]\\]/g;
const _unsafeSlash = /(^|[^\\])\//g;   // lomítko NEpředchází zpětné lomítko

export const rgxToStr = (rgx) => {
  if (!(rgx instanceof RegExp)) throw new TypeError("Expected RegExp");

  const pattern = rgx.source.replace(_unsafeSlash, '$1\\/'); // escapuj jen „nahé“ /
  return `/${pattern}/${rgx.flags}`;
};

export const strToRgx = (str, strict = false) => {
  if (typeof str !== "string") throw new TypeError("Expected string");

  const m = str.match(_regex);
  if (m) return new RegExp(m[1], m[2]);
  if (strict) throw new SyntaxError("Invalid regex string");

  return new RegExp(str.replace(_regexEsc, '\\$&'));
};
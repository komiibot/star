import { regExpEsc } from "@sapphire/utilities";
import { isNullishOrEmpty } from "@sapphire/utilities";

let sensitivePattern: string | RegExp;
const zws = String.fromCharCode(8203);

export function clean(text: string) {
  if (typeof sensitivePattern === "undefined") {
    throw new Error("initClean must be called before running this.");
  }
  return text.replace(sensitivePattern, "「ｒｅｄａｃｔｅｄ」").replace(/`/g, `\`${zws}`).replace(/@/g, `@${zws}`);
}

export function initClean(tokens: readonly string[]) {
  sensitivePattern = new RegExp(tokens.map(regExpEsc).join("|"), "gi");
}

const secrets = new Set<string>();
const suffixes = ["_KEY", "_TOKEN", "_SECRET", "_PASSWORD", "TOKEN", "_URL"];
for (const [key, value] of Object.entries(process.env)) {
  if (isNullishOrEmpty(value)) continue;
  if (suffixes.some((suffix) => key.endsWith(suffix))) secrets.add(value);
}

initClean([...secrets]);

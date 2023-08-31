export function toUnderscore(str: string, isLowerCase?: boolean) {
  const tmp: string = str.replace(/ /g, "_");
  return isLowerCase ? tmp.toLowerCase() : tmp;
}

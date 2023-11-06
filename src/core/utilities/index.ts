export { default as createRouteConstants } from "./createRouteConstants";
export { default as createRoutePath } from "./createRoutePath";
export { default as loadModules } from "./loadModules";
export * from "./object";
export * from "./pathMatched";
export * from "./request";

export function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

import globalLocales from "@/localization/locales";
import "@intlify/core-base";

declare global {
  interface Localization {}

  type FinalLocalization = Localization & typeof globalLocales.vi;

  type WithOrWithoutPlural<K> = TypeOptions["jsonFormat"] extends "v4"
    ? K extends `${infer B}_${
        | "zero"
        | "one"
        | "two"
        | "few"
        | "many"
        | "other"}`
      ? B | K
      : K
    : K;

  // Normalize single namespace
  export type KeysWithSeparator<K1, K2, S extends string = "."> = `${K1 &
    string}${S}${K2 & string}`;
  type KeysWithSeparator2<K1, K2> = KeysWithSeparator<
    K1,
    Exclude<K2, keyof any[]>
  >;
  type Normalize2<T, K = keyof T> = K extends keyof T
    ? T[K] extends Record<string, any>
      ? T[K] extends readonly any[]
        ?
            | KeysWithSeparator2<K, WithOrWithoutPlural<keyof T[K]>>
            | KeysWithSeparator2<K, Normalize2<T[K]>>
        :
            | KeysWithSeparator<K, WithOrWithoutPlural<keyof T[K]>>
            | KeysWithSeparator<K, Normalize2<T[K]>>
      : never
    : never;
  type Normalize<T> = WithOrWithoutPlural<keyof T> | Normalize2<T>;
}

declare module "@intlify/core-base" {
  type Path = Normalize<FinalLocalization>;
}

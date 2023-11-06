export type KebabCase<S> = S extends `${infer C}${infer T}`
  ? KebabCase<T> extends infer U
    ? U extends string
      ? T extends Uncapitalize<T>
        ? `${Uncapitalize<C>}${U}`
        : `${Uncapitalize<C>}-${U}`
      : never
    : never
  : S;

export type ToCamel<S extends string | number | symbol> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
    ? `${ToCamel<Uncapitalize<Head>>}${Capitalize<ToCamel<Tail>>}`
    : Uncapitalize<S>
  : never;

export type PascalCase<S extends string> = S extends string
  ? S extends `${infer Head}_${infer Tail}`
    ? `${Capitalize<ToCamel<Head>>}${Capitalize<ToCamel<Tail>>}`
    : S extends `${infer Head}-${infer Tail}`
    ? `${Capitalize<ToCamel<Head>>}${Capitalize<ToCamel<Tail>>}`
    : Capitalize<S>
  : never;

export type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance<
    Props,
    RawBindings,
    D,
    C,
    M
  > = ComponentPublicInstance<any>,
  Props = any,
  RawBindings = any,
  D = any,
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): T;
};

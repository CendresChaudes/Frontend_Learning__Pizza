type Nullable<T> = T | null;

type NotNullable<T> = Exclude<T, null>;

type Voidable<T> = T | undefined;

type NotVoidable<T> = Exclude<T, undefined>;

type Nonexistent<T> = Voidable<Nullable<T>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VoidFn = (...properties: any[]) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Keys<T extends Record<string, any>> = keyof T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values<T extends Record<string, any>> = T[Keys<T>];

type Primitive = string | number | boolean | null | undefined | symbol;

declare const __brand__: unique symbol;

type Brand<Type, Key extends string> = Type & { [__brand__]: Key };

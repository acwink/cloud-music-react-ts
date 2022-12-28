export type FunctionType = (...args: any[]) => any;
export type PlainObjectType = Record<PropertyKey, any>;
export type Flatten<T> = { [K in keyof T]: T[K] };

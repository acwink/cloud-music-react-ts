import { NavigateFunction, Params } from "react-router";

export type FunctionType = (...args: any[]) => any;
export type PlainObjectType = Record<PropertyKey, any>;
export type Flatten<T> = { [K in keyof T]: T[K] };
export type RouterType = {
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
  location: Location;
  query: {
    [k: string]: string;
  };
};

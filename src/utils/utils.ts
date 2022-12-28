import { FunctionType } from "@/types/shared";

export const getCount = (count: number) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  }

  if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 100) / 10 + "万";
  }

  return Math.floor(count / 10000000) / 10 + "亿";
};

export const debounce = (
  func: FunctionType | undefined,
  delay: number
): FunctionType | undefined => {
  if (!func) return undefined;

  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

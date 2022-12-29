import rank from "@/store/modules/rank";
import { FunctionType } from "@/types/shared";
import { IRankItem } from "../types/rank";

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

export const filterIndex = (rankList: IRankItem[]) => {
  for (let i = 0; i < rankList.length; ++i) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
  return rankList.length;
};

// 处理歌手列表拼接歌手名字
export const getName = (list: any[]) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const isEmptyObj = (obj: Record<PropertyKey, any>) => {
  return Object.keys(obj).length === 0;
};

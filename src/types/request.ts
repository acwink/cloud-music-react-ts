import { PlainObjectType, Flatten } from "./shared";
import { IBannerImage, IRecommendItem } from "./recommend";
import { IArtist } from "./singers";
import { IRankItem } from "./rank";

export type ApiRes<T extends PlainObjectType> = {
  code: string;
} & T;

// banner 返回值
export type ApiBanners = Flatten<ApiRes<{ banners: IBannerImage[] }>>;

// 个性化推荐
export type ApiRecommend = Flatten<
  ApiRes<{
    hasTaste: boolean;
    category: number;
    result: IRecommendItem[];
  }>
>;

// 歌手请求
export type ApiSingerList = Flatten<
  ApiRes<{
    more: boolean;
    artists: IArtist[];
  }>
>;

// 排行榜列表
export type ApiRankList = Flatten<
  ApiRes<{
    list: IRankItem[];
    artistToplist: {
      coverUrl: string;
      artists: Array<{ first: string; second: string; third: number }>;
      name: string;
      upateFrequency: string;
      position: number;
      updateFrequency: string;
    };
    rewardToplist: {
      coverUrl: string;
      songs: any[];
      name: string;
      position: number;
    };
  }>
>;

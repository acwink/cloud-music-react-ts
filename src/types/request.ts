import { IBannerImage, IRecommendItem } from "./recommend";
import { IArtist } from "./singers";
import { IRankItem } from "./rank";

interface ApiRes {
  code: string;
}

// banner 返回值
export interface ApiBanners extends ApiRes {
  banners: IBannerImage[];
}

// 个性化推荐
export interface ApiRecommend extends ApiRes {
  hasTaste: boolean;
  category: number;
  result: IRecommendItem[];
}

// 歌手请求
export interface ApiSingerList extends ApiRes {
  more: boolean;
  artists: IArtist[];
}

// 排行榜列表
export interface ApiRankList extends ApiRes {
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
}

// 返回专辑数据
export interface ApiAlbumDetail extends ApiRes {
  relatedVideos: any;
  playlist: any;
  urls: string[];
  privileges: any[];
  sharedPrivilege: any;
  resEntrance: any;
  fromUsers: any;
  fromUserCount: number;
  songFromUsers: any;
}

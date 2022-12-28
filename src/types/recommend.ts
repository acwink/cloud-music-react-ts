export interface IBannerImage {
  imageUrl: string;
  targetId: number;
  adid: string | null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: string;
  exclusive: boolean;
  monitorImpress: string | null;
  monitorClick: string | null;
  monitorType: string | null;
  monitorImpressList: string | null;
  monitorClickList: string | null;
  monitorBlackList: string | null;
  extMonitor: string | null;
  extMonitorInfo: string | null;
  adSource: string | null;
  adLocation: string | null;
  adDispatchJson: string | null;
  encodeId: string;
  program: string | null;
  event: string | null;
  video: string | null;
  song: string | null;
  scm: string;
  bannerBizType: string;
}

export interface IRecommendItem {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}

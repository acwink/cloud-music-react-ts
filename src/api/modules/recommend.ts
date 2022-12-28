import wkRequest from "..";
import { ApiBanners, ApiRecommend } from "@/types/request";

export const getBannerRequest = () => {
  return wkRequest.get<ApiBanners>({
    url: "/banner",
  });
};

export const getRecommendRequest = () => {
  return wkRequest.get<ApiRecommend>({
    url: "/personalized",
  });
};

import wkRequest from "../index";
import { ApiRankList } from "@/types/request";

export const getRankListRequest = () => {
  return wkRequest.get<ApiRankList>({
    url: "/toplist/detail",
  });
};

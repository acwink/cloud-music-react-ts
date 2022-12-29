import wkRequest from "../index";
import { ApiAlbumDetail } from "@/types/request";
export const getAlbumDetailRequest = (id: number) => {
  return wkRequest.get<ApiAlbumDetail>({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
};

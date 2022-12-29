import wkRequest from "..";
import { ApiSingerInfo } from "@/types/request";

export const getSingerInfoRequest = (id: string) => {
  return wkRequest.get<ApiSingerInfo>({
    url: "/artists",
    params: {
      id,
    },
  });
};

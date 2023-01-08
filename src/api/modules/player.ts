import wkRequest from "..";
export const getLyricRequest = (id: string | number) => {
  return wkRequest.get<any>({
    url: "/lyric",
    params: {
      id,
    },
  });
};

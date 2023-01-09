import wkRequest from "../index";

// 获取热门关键词
export const getHotKeyWordsRequest = () => {
  return wkRequest.get({
    url: "/search/hot",
  });
};

// 获取搜索联想列表
export const getSuggestListRequest = (query: string) => {
  return wkRequest.get({
    url: "/search/suggest",
    params: {
      keywords: query,
    },
  });
};

// 获取查询结果
export const getResultSongsListRequest = (query: string) => {
  return wkRequest.get({
    url: "/search",
    params: {
      keywords: query,
    },
  });
};

// 获取歌曲详细信息
export const getSongDetailRequest = (id: string | number) => {
  return wkRequest.get({
    url: "/song/detail",
    params: {
      ids: id,
    },
  });
};

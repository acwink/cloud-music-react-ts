import React, { memo, useCallback } from "react";
import LazyLoad from "react-lazyload";

import { ListWrapper, List, ListItem } from "./style";
import { getCount } from "@/utils/utils";

import type { IRecommendItem } from "@/types/recommend";

import StandImg from "./music.png";
import withRouter from "../../hoc/withRouter";
import { RouterType } from "@/types/shared";

interface IRecommentListProps {
  recommendList: IRecommendItem[];
  router?: RouterType;
}

const RecommendList = memo((props: IRecommentListProps) => {
  const { recommendList = [], router } = props;

  // 跳转到歌单详情页面
  const enterDetail = (id: number) => {
    if (router) {
      router.navigate(`/recommend/${id}`);
    }
  };

  return (
    <ListWrapper>
      <div className="title">推荐歌单</div>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={index} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 此参数可以减少请求的图片资源 */}
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={StandImg}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
});

export default withRouter(RecommendList);

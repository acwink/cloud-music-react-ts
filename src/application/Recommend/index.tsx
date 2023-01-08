import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forceCheck } from "react-lazyload";

import Slider from "@/components/slider";
import RecommendList from "@/components/list/index";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import { RecommendWrapper } from "./style";

import type { RootState, AppDispatch } from "@/store";
import { fetchRecommendDataAction } from "@/store/modules/recommend";
import { Outlet } from "react-router-dom";

const Recommend = memo(() => {
  // 发送异步网络请求
  const dispatch = useDispatch<AppDispatch>();
  const { bannerList, recommendList, enterLoading, playList } = useSelector(
    (state: RootState) => ({
      bannerList: state.recommend.bannerList,
      recommendList: state.recommend.recommendList,
      enterLoading: state.recommend.enterLoading,
      playList: state.player.playList,
    })
  );

  useEffect(() => {
    if (!bannerList.length || !recommendList.length)
      dispatch(fetchRecommendDataAction());
  }, [dispatch]);

  return (
    <RecommendWrapper play={playList.length}>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading && <Loading />}
      <Outlet />
    </RecommendWrapper>
  );
});

export default Recommend;

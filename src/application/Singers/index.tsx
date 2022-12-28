import React, { memo, useCallback, useEffect, useContext } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";

import Horizen from "@/baseUI/horizen";
import { categoryTypes, alphaTypes } from "@/api/modules/singers";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import Scroll from "@/baseUI/scroll";
import {
  fetchMoreSingerListDataAction,
  fetchHotSingerListDataAction,
  changePageCountAction,
  changePullUpLoadingAction,
  changeEnterLoadingAction,
  changePullDownLoadingAction,
  fetchSingerListDataAction,
  fetchMoreHotSingerListDataAction,
} from "@/store/modules/singers";

import { connect } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/index";
import { FunctionType, Flatten } from "@/types/shared";
import { IArtist } from "@/types/singers";
import Loading from "@/baseUI/loading";

import singerImg from "./singer.png";
import { CategoryDataContext, actionTypes } from "./data";

// 渲染函数，返回歌手列表
const renderSingerList = (singerList: IArtist[]) => {
  return (
    <List>
      {singerList.map((item, index) => {
        return (
          <ListItem key={item.accountId + "" + index}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img width="100%" height="100%" src={singerImg} alt="music" />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        );
      })}
    </List>
  );
};

export type ISingersProps = Flatten<
  ReturnType<SingerMapDispatchToProps> & ReturnType<SingerMapStateToProps>
>;

const Singers = memo((props: ISingersProps) => {
  const {
    singerList,
    enterLoading,
    pageCount,
    pullUpLoading,
    pullDownLoading,
  } = props;
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;

  // 拿到上下文存储的数据
  const { data, dispatch } = useContext(CategoryDataContext);
  const category = data?.category ?? "";
  const alpha = data?.alpha ?? "";
  // const [category, setCategory] = useState<string>("");
  // const [alpha, setAlpha] = useState<string>("");

  const handleUpdateAlpha = useCallback((val: string) => {
    dispatch && dispatch({ type: actionTypes.CHANGE_ALPHA, data: val });
    updateDispatch(category, val);
  }, []);

  const handleUpdateCategory = useCallback((val: string) => {
    dispatch && dispatch({ type: actionTypes.CHANGE_CATEGORY, data: val });
    updateDispatch(val, alpha);
  }, []);

  const pullUpHandle = () => {
    pullUpRefreshDispatch(
      category,
      alpha,
      category === "" || alpha === "",
      pageCount
    );
  };
  const pullDownHandle = () => {
    pullDownRefreshDispatch(category, alpha);
  };
  useEffect(() => {
    if (!singerList.length) getHotSingerDispatch();
  }, []);

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类（默认热门）: "}
          handleClick={handleUpdateCategory}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"按字母排序"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        {enterLoading && <Loading />}

        <Scroll
          onScroll={forceCheck}
          pullUp={pullUpHandle}
          pullDown={pullDownHandle}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
        >
          {renderSingerList(singerList)}
        </Scroll>
      </ListContainer>
    </div>
  );
});

type SingerMapStateToProps = (state: RootState) => {
  singerList: IArtist[];
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  pageCount: number;
};

const mapStateToProps: SingerMapStateToProps = (state: RootState) => ({
  singerList: state.singers.singerList,
  enterLoading: state.singers.enterLoading,
  pullUpLoading: state.singers.pullUpLoading,
  pullDownLoading: state.singers.pullDownLoading,
  pageCount: state.singers.pageCount,
});

type SingerMapDispatchToProps = (dispatch: AppDispatch) => {
  getHotSingerDispatch: FunctionType;
  updateDispatch: (category: string, alpha: string) => void;
  pullUpRefreshDispatch: (
    category: string,
    alpha: string,
    hot: boolean,
    count: number
  ) => void;
  pullDownRefreshDispatch: (category: string, alpha: string) => void;
};
const mapDispatchToProps: SingerMapDispatchToProps = (
  dispatch: AppDispatch
) => {
  return {
    getHotSingerDispatch() {
      dispatch(fetchHotSingerListDataAction());
    },
    updateDispatch(category: string, alpha: string) {
      dispatch(changePageCountAction(0));
      dispatch(changeEnterLoadingAction(true));
      dispatch(fetchSingerListDataAction({ category, alpha }));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(
      category: string,
      alpha: string,
      hot: boolean,
      count: number
    ) {
      dispatch(changePullUpLoadingAction(true));
      dispatch(changePageCountAction(count + 1));
      if (hot) {
        dispatch(fetchMoreHotSingerListDataAction(""));
      } else {
        dispatch(fetchMoreSingerListDataAction({ category, alpha }));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(changePullDownLoadingAction(true));
      dispatch(changePageCountAction(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(fetchHotSingerListDataAction());
      } else {
        dispatch(fetchSingerListDataAction({ category, alpha }));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Singers);

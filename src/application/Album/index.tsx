import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { Container } from "./style";
import { RouterType } from "@/types/shared";
import withRouter from "@/hoc/withRouter";
import Header from "@/baseUI/header";
import Scroll from "@/baseUI/scroll";
import SongList from "../SongList";
import { getCount } from "@/utils/utils";
import { TopDesc, Menu } from "./style";
import theme from "@/assets/theme/global-style";

import { RootState } from "@/store/index";
import { AppDispatch } from "../../store/index";
import { fetchAlbumDetailDataAction } from "../../store/modules/album";
import { isEmptyObj } from "../../utils/utils";
import Loading from "@/baseUI/loading";

export const HEADER_HIGHT = 45;

interface IAlbumProps {
  router?: RouterType;
}

const Album = memo((props: IAlbumProps) => {
  const { router } = props;
  const [title, setTitle] = useState("歌单");
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);

  const headerEl = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { currentAlbum, enterLoading } = useSelector((state: RootState) => {
    return {
      currentAlbum: state.album.currentAlbum,
      enterLoading: state.album.enterLoading,
    };
  }, shallowEqual);

  // UI
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>

        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {getCount(currentAlbum.subscribedCount)}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };
  const renderSongList = () => {
    return (
      <SongList
        songs={currentAlbum.tracks}
        collectCount={currentAlbum.subscribedCount}
        showCollect={true}
        showBackground={true}
      />
    );
  };
  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos: any) => {
      const minScrollY = -HEADER_HIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom = headerEl.current!;

      // 划过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = theme["theme-color"];
        headerDom.style.opacity = "" + Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1 + "";
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  useEffect(() => {
    dispatch(fetchAlbumDetailDataAction(Number(router!.params.id)));
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      onExited={() => router!.navigate(-1)}
    >
      <Container>
        <Header
          ref={headerEl}
          isMarquee={isMarquee}
          title={title}
          handleClick={handleBack}
        />
        {enterLoading && <Loading />}
        {isEmptyObj(currentAlbum) ? (
          ""
        ) : (
          <Scroll onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              {renderSongList()}
            </div>
          </Scroll>
        )}
      </Container>
    </CSSTransition>
  );
});

export default withRouter(Album);

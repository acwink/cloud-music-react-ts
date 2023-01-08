import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { RouterType } from "@/types/shared";
import withRouter from "@/hoc/withRouter";
import {
  Container,
  ImgWrapper,
  SongListWrapper,
  CollectButton,
  BgLayer,
} from "./style";
import Header from "@/baseUI/header";
import Scroll from "@/baseUI/scroll";
import SongList from "../SongList";
import { HEADER_HIGHT } from "@/baseUI/header/index";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { fetchSingerInfoAction } from "../../store/modules/singer";
import MusicNode from "@/baseUI/music-note";
import { FunctionType } from "../../types/shared";
interface ISingerProps {
  router?: RouterType;
}

const Singer = memo((props: ISingerProps) => {
  const { router } = props;
  const [showStatus, setShowStatus] = useState(true);

  const { artist, hotSongs } = useSelector((state: RootState) => {
    return {
      artist: state.singer.artist,
      hotSongs: state.singer.songsOfArtist,
    };
  }, shallowEqual);

  const collectButton = useRef<any>();
  const imageWrapper = useRef<any>();
  const songScrollWrapper = useRef<any>();
  const songScroll = useRef<any>();
  const header = useRef<any>();
  const layer = useRef<any>();
  const musicNoteRef = useRef<{ startAnimation: FunctionType }>();

  // 图片初始高度
  const initialHeight = useRef(0);

  const OFFSET = 5;

  useEffect(() => {
    const h = imageWrapper.current!.offsetHeight;
    songScrollWrapper.current!.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current!.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    //eslint-disable-next-line
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((pos: any) => {
    const height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;

    const minScrollY = -(height - OFFSET) + HEADER_HIGHT;

    // 指的是滑动距离占图片的百分比
    const percent = Math.abs(newY / height);
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (router) dispatch(fetchSingerInfoAction(router.params.id!));
  }, []);

  const musicAnimation = useCallback(
    (x: number, y: number) => {
      if (musicNoteRef.current) musicNoteRef.current.startAnimation({ x, y });
    },
    [musicNoteRef]
  );
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => router?.navigate(-1)}
    >
      <Container play={1}>
        <Header
          ref={header}
          title={"头部"}
          handleClick={setShowStatusFalse}
        ></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll onScroll={handleScroll} ref={songScroll}>
            <SongList
              showBackground
              songs={hotSongs}
              showCollect={false}
              musicAnimation={musicAnimation}
            ></SongList>
          </Scroll>
        </SongListWrapper>
        <MusicNode ref={musicNoteRef} />
      </Container>
    </CSSTransition>
  );
});

export default withRouter(Singer);

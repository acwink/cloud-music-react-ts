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

interface ISingerProps {
  router?: RouterType;
}

const Singer = memo((props: ISingerProps) => {
  const { router } = props;
  const [showStatus, setShowStatus] = useState(true);

  const artist = {
    picUrl:
      "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑",
        },
      },
      // 省略 20 条
    ],
  };

  const collectButton = useRef<any>();
  const imageWrapper = useRef<any>();
  const songScrollWrapper = useRef<any>();
  const songScroll = useRef<any>();
  const header = useRef<any>();
  const layer = useRef<any>();
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

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => router?.navigate(-1)}
    >
      <Container play={0}>
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
          <Scroll ref={songScroll}>
            <SongList
              showBackground
              songs={artist.hotSongs}
              showCollect={false}
            ></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
});

export default withRouter(Singer);

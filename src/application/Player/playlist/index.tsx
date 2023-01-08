import React, {
  memo,
  TouchEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";

import {
  PlayListWrapper,
  ScrollWrapper,
  ListHeader,
  ListContent,
} from "./style";
import Scroll from "@/baseUI/scroll";
import useShowPlayList from "../hooks/useShowPlayList";
import useCurrent from "../hooks/useCurrent";
import usePlayList from "../hooks/usePlayList";
import useMode from "../hooks/useMode";
import { playMode } from "@/store/modules/player";
import { getName } from "@/utils/utils";
import Confirm from "@/baseUI/confirm";
import { FunctionType } from "../../../types/shared";

const PlayList = memo(() => {
  const [isShow, setIsShow] = useState(false);
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true);

  // 记录 touchStart 后记录y值
  const [startY, setStartY] = useState(0);
  // touchStart 事件以及被触发
  const [initialed, setInitialed] = useState(false);
  // 用户下滑的距离
  const [distance, setDistance] = useState(0);

  const playListRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<{ show: FunctionType }>();
  const listContentRef = useRef<HTMLDivElement>(null);

  // 使用hooks
  const { currentSong, changeCurrentIndex } = useCurrent();
  const { playList, deleteSong, clearSongList } = usePlayList();
  const { showPlayList, toggleShowPlayList } = useShowPlayList();
  const { mode, changeMode } = useMode();

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    if (listWrapperRef.current)
      listWrapperRef.current.style.transform = "translate3d(0, 100%, 0)";
  }, []);

  const onEnteringCB = useCallback(() => {
    // 让列表显示
    if (listWrapperRef.current) {
      listWrapperRef.current.style.transition = "all 0.3s";
      listWrapperRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);
  const onExitingCB = useCallback(() => {
    if (listWrapperRef.current) {
      listWrapperRef.current.style.transition = "all 0.3s";
      listWrapperRef.current.style.transform = "translate3d(0, 100%, 0)";
    }
  }, []);
  const onExitedCB = useCallback(() => {
    setIsShow(false);
    if (listWrapperRef.current) {
      listWrapperRef.current.style.transform = "translate3d(0, 100%, 0)";
    }
  }, []);

  const getCurrentIcon = (item: any) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? "icon-play" : "";
    const content = current ? "&#xe6e3;" : "";
    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };

  const handleShowClear = () => {
    confirmRef.current?.show();
  };

  const handleConfirmClear = () => {
    clearSongList();
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i
          className="iconfont"
          onClick={() => changeMode()}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={() => changeMode()}>
          {text}
        </span>
      </div>
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canTouch || initialed) return;
    if (listWrapperRef.current) listWrapperRef.current.style.transition = "";
    setStartY(e.nativeEvent.touches[0].pageY);
    setInitialed(true);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canTouch || !initialed) return;

    const distance = (e as any).nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance);
    if (listWrapperRef.current)
      listWrapperRef.current.style.transform = `translate3d(0, ${distance}px,0)`;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setInitialed(false);

    // 这里设置阈值为 150px
    if (distance >= 150) {
      toggleShowPlayList(false);
    } else {
      // 否则弹回去
      if (listWrapperRef.current) {
        listWrapperRef.current.style.transition = "all 0.3s";

        listWrapperRef.current.style.transform = "translate3d(0,0,0)";
      }
    }
  };

  const handleScroll = (pos: any) => {
    const state = pos.y === 0;
    setCanTouch(state);
  };
  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow ? { display: "block" } : { display: "none" }}
        onClick={(e) => {
          toggleShowPlayList(false);
          e.stopPropagation();
        }}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ListHeader>
            {getPlayMode()}
            <span className="iconfont clear" onClick={handleShowClear}>
              &#xe63d;
            </span>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={handleScroll}
              bounceTop={false}
            >
              <ListContent>
                {playList.map((item: any, index: number) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => changeCurrentIndex(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar)}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span
                        className="delete"
                        onClick={(e) => deleteSong(e, playList[index])}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text={"是否确认全部删除?"}
          handleConfirm={handleConfirmClear}
        />
      </PlayListWrapper>
    </CSSTransition>
  );
});

export default PlayList;

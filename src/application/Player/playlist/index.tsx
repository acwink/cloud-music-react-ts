import React, { memo, useCallback, useRef, useState } from "react";
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

  const playListRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<{ show: FunctionType }>();

  // 使用hooks
  const { currentSong, changeCurrentIndex } = useCurrent();
  const { playList, deleteSong, clearSongList } = usePlayList();
  const { showPlayList, toggleShowPlayList } = useShowPlayList();
  const { mode } = useMode();

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

  const changeMode = (e: React.MouseEvent<HTMLElement>) => {
    let newMode = (mode + 1) % 3;
    newMode = 1;
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
          onClick={(e) => changeMode(e)}
          dangerouslySetInnerHTML={{ __html: content }}
        ></i>
        <span className="text" onClick={(e) => changeMode(e)}>
          {text}
        </span>
      </div>
    );
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
        onClick={(e) => toggleShowPlayList(e, false)}
      >
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={(e) => e.stopPropagation()}
        >
          <ListHeader>
            {getPlayMode()}
            <span className="iconfont clear" onClick={handleShowClear}>
              &#xe63d;
            </span>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
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

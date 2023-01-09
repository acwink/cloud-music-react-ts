import React, { memo, useRef } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import { MiniPlayerContainer } from "./style";
import ProgressCircle from "@/baseUI/progress/circle";
import useFullScreen from "../hooks/useFullScreen";
import usePlaying from "../hooks/usePlaying";

import { getName } from "@/utils/utils";
import useShowPlayList from "../hooks/useShowPlayList";

interface IMiniPlayerProps {
  song: any;
  percent: number;
}

const MiniPlayer = memo((props: IMiniPlayerProps) => {
  const { song, percent } = props;
  const { fullScreen, toggleFullScreen } = useFullScreen();
  const { playing, togglePlaying } = usePlaying();
  const { toggleShowPlayList } = useShowPlayList();

  const miniPalyerRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      classNames="mini"
      in={!fullScreen}
      timeout={400}
      onEnter={() => {
        if (miniPalyerRef.current !== null)
          miniPalyerRef.current.style.display = "flex";
      }}
      onExited={() => {
        if (miniPalyerRef.current !== null)
          miniPalyerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer
        ref={miniPalyerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
              className={classNames("play", { pause: playing })}
            />
          </div>
        </div>
        <div className="text">
          <div className="name">{song.name}</div>
          <div className="desc">{getName(song.ar)}</div>
        </div>
        <div className="control" onClick={(e) => e.stopPropagation()}>
          <ProgressCircle radius={32} percent={percent}>
            {playing ? (
              <i
                className="icon-mini iconfont icon-pause"
                onClick={() => togglePlaying(false)}
              >
                &#xe650;
              </i>
            ) : (
              <i
                className="icon-mini iconfont icon-play"
                onClick={() => togglePlaying(true)}
              >
                &#xe61e;
              </i>
            )}
          </ProgressCircle>
        </div>
        <div
          className="control"
          onClick={(e) => {
            e.stopPropagation();
            toggleShowPlayList(true);
          }}
        >
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
});

export default MiniPlayer;

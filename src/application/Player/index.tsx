import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import MiniPlayer from "./miniPlayer";
import NormalPalyer from "./normalPalyer";
import useCurrent from "./hooks/useCurrent";
import usePlaying from "./hooks/usePlaying";

import { getSongUrl, isEmptyObject } from "@/utils/utils";
import usePlayList from "./hooks/usePlayList";
import Toast from "@/baseUI/toast";
import { FunctionType } from "../../types/shared";
import useMode from "./hooks/useMode";
import { playMode } from "@/store/modules/player";

const Player = memo(() => {
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);

  // 记录当前的歌曲，以便下次重新渲染时比对是否是同一首歌曲
  const [preSong, setPreSong] = useState<Record<PropertyKey, any>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const toastRef = useRef<{ show: FunctionType }>(null);

  // 歌曲播放进度
  const percent = Number.isNaN(currentTime / duration)
    ? 0
    : currentTime / duration;

  // 当前歌曲和当前歌曲下标
  const { currentIndex, currentSong, changeCurrentSong, changeCurrentIndex } =
    useCurrent();
  const { playing, togglePlaying } = usePlaying();
  const { playList } = usePlayList();
  const { mode } = useMode();
  const modeText = useMemo(() => {
    let context = "";
    if (mode === playMode.sequence) {
      context = "顺序播放";
    } else if (mode === playMode.loop) {
      context = "循环播放";
    } else {
      context = "随机播放";
    }
    return context;
  }, [mode]);

  // 通过ref解决闭包陷阱
  const playListRef = useRef(playList);
  const currentIndexRef = useRef(currentIndex);
  const currentSongRef = useRef(currentSong);
  const playingRef = useRef(playing);

  playListRef.current = playList;
  currentIndexRef.current = currentIndex;
  currentSongRef.current = currentSong;
  playingRef.current = playing;

  // 更新进度条
  const updateTime = useCallback((e: any) => {
    setCurrentTime(e.target.currentTime);
  }, []);

  // 进度条改变修改 percent 的回调函数
  const onProgressChange = useCallback((curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current!.currentTime = newTime;
    if (!playing) {
      togglePlaying(true);
    }
  }, []);

  // 一首歌曲循环
  const handleLoop = () => {
    audioRef.current!.currentTime = 0;
    togglePlaying(true);
    audioRef.current!.play();
  };

  // 上一首歌曲
  const handlePre = useCallback(() => {
    // 播放列表只有一首歌循环播放
    if (playListRef.current.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndexRef.current - 1;
    if (index < 0) index = playListRef.current.length - 1;
    if (!playingRef.current) togglePlaying(true);
    changeCurrentIndex(index);
  }, []);

  // 下一首歌曲
  const handleNext = useCallback(() => {
    // 歌单只有一首歌曲，循环
    if (playListRef.current.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndexRef.current + 1;
    if (index === playListRef.current.length) index = 0;
    if (!playingRef.current) togglePlaying(true);
    changeCurrentIndex(index);
  }, []);

  // 歌曲播放完毕后的处理逻辑
  const handleEnd = useCallback(() => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  }, []);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) {
      return;
    }
    const current = playList[currentIndex];
    changeCurrentSong(current);
    setPreSong(current);
    audioRef.current!.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current?.play();
    });
    togglePlaying(true);

    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);
  }, [playList, currentIndex]);

  // 暂停逻辑
  useEffect(() => {
    playing ? audioRef.current?.play() : audioRef.current?.pause();
  }, [playing]);

  // 监听mode发生变化，显示弹窗
  useEffect(() => {
    toastRef.current?.show();
  }, [mode]);

  return (
    <div>
      {!isEmptyObject(currentSong) && (
        <NormalPalyer
          song={currentSong}
          percent={percent}
          duration={duration}
          currentTime={currentTime}
          onProgressChange={onProgressChange}
          handleNext={handleNext}
          handlePrev={handlePre}
        />
      )}
      {!isEmptyObject(currentSong) && (
        <MiniPlayer song={currentSong} percent={percent}></MiniPlayer>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
      ></audio>
      <Toast ref={toastRef} text={modeText} />
    </div>
  );
});

export default Player;

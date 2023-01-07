import React, { memo, useState, useRef, useEffect } from "react";
import MiniPlayer from "./miniPlayer";
import NormalPalyer from "./normalPalyer";
import useCurrent from "./hooks/useCurrent";
import usePlaying from "./hooks/usePlaying";
import useFullScreen from "./hooks/useFullScreen";

import { getSongUrl, isEmptyObject } from "@/utils/utils";

const Player = memo(() => {
  // const currentSong = {
  //   al: {
  //     picUrl:
  //       "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
  //   },
  //   name: "木偶人",
  //   ar: [{ name: "薛之谦" }],
  // };
  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);

  // 歌曲播放进度
  const percent = Number.isNaN(currentTime / duration)
    ? 0
    : currentTime / duration;

  // 当前歌曲和当前歌曲下标
  const { currentIndex, currentSong, changeCurrentSong, changeCurrentIndex } =
    useCurrent();
  const { playing, togglePlaying } = usePlaying();
  const audioRef = useRef<HTMLAudioElement>(null);

  const playList = [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ];

  // 更新进度条
  const updateTime = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };

  // 进度条改变修改 percent 的回调函数
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current!.currentTime = newTime;
    if (!playing) {
      togglePlaying(true);
    }
  };

  // 一首歌曲循环
  const handleLoop = () => {
    audioRef.current!.currentTime = 0;
    togglePlaying(true);
    audioRef.current!.play();
  };

  // 上一首歌曲
  const handlePre = () => {
    // 播放列表只有一首歌循环播放
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlaying(true);
    changeCurrentIndex(index);
  };

  // 下一首歌曲
  const handleNext = () => {
    // 歌单只有一首歌曲，循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlaying(true);
    changeCurrentIndex(index);
  };

  useEffect(() => {
    if (!currentSong) return;
    changeCurrentIndex(0);
    const current = playList[0];
    changeCurrentSong(current);
    audioRef.current!.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current!.play();
    });
    // togglePlaying(true); // 播放状态
    setCurrentTime(0); // 从头开始播放
    setDuration((current.dt / 1000) | 0); // 时长
  }, []);

  useEffect(() => {
    playing ? audioRef.current!.play() : audioRef.current!.pause();
  }, [playing]);

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
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </div>
  );
});

export default Player;

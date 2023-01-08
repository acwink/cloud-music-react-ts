import { useState, useMemo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "@/store/index";
import { AppDispatch } from "@/store/index";
import { changeCurrentIndexAction } from "@/store/modules/player";
import {
  changeModeAction,
  changePlayListAction,
  playMode,
} from "@/store/modules/player";
import { findIndex, shuffle } from "@/utils/utils";

function useMode() {
  const { mode, currentSong, sequencePlayList } = useSelector(
    (state: RootState) => {
      return {
        mode: state.player.mode,
        currentSong: state.player.currentSong,
        sequencePlayList: state.player.sequencePlayList,
      };
    },
    shallowEqual
  );

  const dispatch = useDispatch<AppDispatch>();
  const changeMode = () => {
    const newMode = (mode + 1) % 3;

    if (newMode === playMode.sequence) {
      changePlayListAction(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList); // 用于找出当前正在播放的歌曲，在对应列表中的下标
      changeCurrentIndexAction(index);
    } else if (newMode === playMode.loop) {
      changePlayListAction(sequencePlayList);
    } else if (newMode === playMode.random) {
      const newList = shuffle(sequencePlayList); // 随机打乱列表，并返回
      const index = findIndex(currentSong, newList);
      changePlayListAction(newList);
      changeCurrentIndexAction(index);
    }

    dispatch(changeModeAction(newMode));
  };

  return {
    mode,
    changeMode,
  };
}

export default useMode;

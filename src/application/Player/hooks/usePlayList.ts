import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../../../store/index";
import {
  changeCurrentIndexAction,
  changePlayListAction,
} from "@/store/modules/player";
import {
  changePalyingAction,
  changeSequencePlayListAction,
} from "@/store/modules/player";

function usePlayList() {
  const { playList, currentIndex, squenceList } = useSelector(
    (state: RootState) => {
      return {
        playList: state.player.playList,
        currentIndex: state.player.currentIndex,
        squenceList: state.player.sequencePlayList,
      };
    },
    shallowEqual
  );

  const dispatch = useDispatch<AppDispatch>();
  const changePlayList = useCallback((data: any) => {
    dispatch(changePalyingAction(data));
  }, []);

  const deleteSong = useCallback(
    (e: React.MouseEvent<HTMLElement>, song: any) => {
      e.stopPropagation();
      // 1. 找到要删除的哥在播放列表中的索引
      const index = (<any[]>playList).findIndex((item) => item.id === song.id);
      // 2. 在播放列表中删除
      const newPlayList = [
        ...(<any[]>playList).slice(0, index),
        ...(<any[]>playList).slice(index + 1),
      ];
      dispatch(changePlayListAction(newPlayList));

      // 3. 在顺序列表中删除
      const sIndex = (<any[]>squenceList).findIndex(
        (item) => item.id === song.id
      );
      const newSquenceList = [
        ...(<any[]>squenceList).slice(0, sIndex),
        ...(<any[]>squenceList).slice(sIndex + 1),
      ];
      dispatch(changeSequencePlayListAction(newSquenceList));

      // 4. 修改currentIndex
      // 删除的歌曲排在播放歌曲前面，currentIndex - 1 让正在播放的歌曲正常播放
      if (index < currentIndex)
        dispatch(changeCurrentIndexAction(currentIndex - 1));
    },
    [playList, squenceList, currentIndex]
  );

  return {
    playList,
    changePlayList,
    deleteSong,
  };
}

export default usePlayList;

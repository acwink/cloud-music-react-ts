import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../../../store/index";
import { getSongDetailRequest } from "../../../api/modules/search";
import { findIndex } from "../../../utils/utils";
import {
  changeCurrentIndexAction,
  changeCurrentSongAction,
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

  const insertSong = async (id: string | number) => {
    // 1. 请求详细数据
    const res = await getSongDetailRequest(id);
    // 插入歌曲到播放列表
    // 看是歌曲是否存在
    const song = res.data.songs[0];
    const fpIndex = findIndex(song, playList);
    // 如果时当前歌曲直接不处理
    if (fpIndex === currentIndex && currentIndex !== -1) return;

    // 不存在该曲子
    const newPlayList = [...playList];
    // 把歌曲放到当前播放曲目的下一个位置
    newPlayList.splice(currentIndex + 1, 0, song);
    let newCurrentIndex = currentIndex + 1;

    // 如果列表中以及存在该曲子
    if (fpIndex > -1) {
      if (currentIndex > fpIndex) {
        newPlayList.splice(fpIndex, 1);
        newCurrentIndex--;
      } else {
        newPlayList.splice(fpIndex, 1);
      }
    }

    dispatch(changePlayListAction(newPlayList));
    dispatch(changeCurrentIndexAction(newCurrentIndex));
  };

  const clearSongList = () => {
    dispatch(changeCurrentIndexAction(-1));
    dispatch(changePalyingAction(false));
    dispatch(changePlayListAction([]));
    dispatch(changeSequencePlayListAction([]));
    dispatch(changeCurrentSongAction({}));
  };

  return {
    playList,
    changePlayList,
    deleteSong,
    clearSongList,
    insertSong,
  };
}

export default usePlayList;

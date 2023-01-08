import React, { ForwardedRef, MouseEvent } from "react";
import { SongItem, SongList } from "./style";
import { getName } from "@/utils/utils";
import { findIndex } from "../../utils/utils";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { FunctionType } from "../../types/shared";
import {
  changeCurrentIndexAction,
  changePlayListAction,
} from "@/store/modules/player";

interface ISongListProps {
  collectCount?: number;
  showCollect?: boolean;
  songs: any[];
  showBackground: boolean;
  musicAnimation?: FunctionType;
}
const SongsList = React.forwardRef(
  (props: ISongListProps, refs: ForwardedRef<HTMLDivElement>) => {
    const { collectCount = 0, showCollect = false, songs } = props;
    const { musicAnimation } = props;

    const totalCount = songs.length;

    const dispatch = useDispatch<AppDispatch>();
    const { playList } = useSelector((state: RootState) => {
      return {
        currentIndex: state.player.currentIndex,
        playList: state.player.playList,
      };
    }, shallowEqual);

    const selectItem = (e: MouseEvent, index: number) => {
      const idx = findIndex(songs[index], playList);
      if (idx !== -1) {
        dispatch(changeCurrentIndexAction(idx));
      } else {
        const newList = [...playList, songs[index]];
        dispatch(changeCurrentIndexAction(newList.length - 1));
        dispatch(changePlayListAction(newList));
      }
      if (musicAnimation)
        musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
    };

    const selectItemAll = () => {
      dispatch(changePlayListAction(songs));
      dispatch(changeCurrentIndexAction(0));
    };

    const songList = (list: any) => {
      const res = [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        res.push(
          <li key={item.id + `${i}`} onClick={(e) => selectItem(e, i)}>
            <span className="index">{i + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
                {item.al ? item.al.name : item.album.name}
              </span>
            </div>
          </li>
        );
      }
      return res;
    };

    const collect = (count: number) => {
      return (
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span> 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
        </div>
      );
    };
    return (
      <SongList ref={refs} showBackground={props.showBackground}>
        <div className="first_line">
          <div className="play_all" onClick={() => selectItemAll()}>
            <i className="iconfont">&#xe6e3;</i>
            <span>
              {" "}
              播放全部 <span className="sum">(共 {totalCount} 首)</span>
            </span>
          </div>
          {showCollect ? collect(collectCount) : null}
        </div>

        <SongItem>{songList(songs)}</SongItem>
      </SongList>
    );
  }
);

export default React.memo(SongsList);

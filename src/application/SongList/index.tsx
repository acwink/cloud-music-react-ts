import React, { ForwardedRef, MouseEvent } from "react";
import { SongItem, SongList } from "./style";
import { getName } from "@/utils/utils";
import { findIndex } from "../../utils/utils";

import { FunctionType } from "../../types/shared";
import usePlayList from "../Player/hooks/usePlayList";
import useCurrent from "../Player/hooks/useCurrent";

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

    const { playList, changePlayList, changeSequenceList } = usePlayList();
    const { changeCurrentIndex } = useCurrent();
    const selectItem = (e: MouseEvent, index: number) => {
      const idx = findIndex(songs[index], playList);
      if (idx !== -1) {
        changeCurrentIndex(idx);
      } else {
        const newList = [...playList, songs[index]];
        changeCurrentIndex(newList.length - 1);
        changePlayList(newList);
      }
      if (musicAnimation)
        musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
    };

    const selectItemAll = () => {
      changeSequenceList(songs);
      changePlayList(songs);
      changeCurrentIndex(0);
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
          <span> ?????? ({Math.floor(count / 1000) / 10} ???)</span>
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
              ???????????? <span className="sum">(??? {totalCount} ???)</span>
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

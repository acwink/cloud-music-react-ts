import { memo, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../store/index";
import { fetchRankListDataAction } from "@/store/modules/rank";
import { filterIndex } from "@/utils/utils";
import { IRankItem } from "../../types/rank";
import { Container, List, ListItem, SongList } from "./style";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";

const Rank = memo(() => {
  const { rankList, loading } = useSelector((state: RootState) => {
    return {
      rankList: state.rank.rankList,
      loading: state.rank.loading,
    };
  });

  // 处理数据，数据分类
  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name: string) => {
    console.log(name);
  };
  // UI
  const renderRankList = (list: IRankItem[], global = false) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.coverImgId + `${index}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>

              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };
  const renderSongList = (list: { first: string; second: string }[]) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}.{item.first} - ${item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };
  const displayStyle = loading ? { display: "none" } : { display: "" };

  // 请求数据
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!rankList.length) dispatch(fetchRankListDataAction());
  }, []);

  return (
    <Container>
      <Scroll>
        {/* @ts-expect-error  */}
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? <Loading /> : null}
        </div>
      </Scroll>
    </Container>
  );
});

export default Rank;

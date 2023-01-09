import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import LazyLoad, { forceCheck } from "react-lazyload";
import {
  Container,
  ShortcutWrapper,
  HotKey,
  List,
  ListItem,
  SongItem,
} from "./style";
import withRouter from "@/hoc/withRouter";
import { RouterType, FunctionType } from "../../types/shared";
import SearchBox from "@/baseUI/search-box";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import StandImg from "@/components/list/music.png";
import { getName } from "../../utils/utils";
import {
  changeEnterLoadingAction,
  getHotKeyWordAsync,
  getSuggestListAsync,
} from "../../store/modules/search";
import usePlayList from "../Player/hooks/usePlayList";
import MusicNote from "@/baseUI/music-note";

interface ISearchProps {
  router?: RouterType;
}

const Search = memo((props: ISearchProps) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  // 组件内部
  const musicNoteRef = useRef<{ startAnimation: FunctionType }>();

  // store 中的数据连接
  const { hotList, enterLoading, suggestList, songsList, songsCount } =
    useSelector((state: RootState) => {
      return {
        hotList: state.search.hotList,
        enterLoading: state.search.enterLoading,
        suggestList: state.search.suggestList,
        songsCount: state.player.playList.length,
        songsList: state.search.songsList,
      };
    }, shallowEqual);
  const dispatch = useDispatch<AppDispatch>();

  const { insertSong } = usePlayList();
  const { router } = props;
  useEffect(() => {
    setShow(true);
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);
  // 因为 handleQuery 中修改的属性，也会传入 SearchBox 触发 SearchBox 的重新渲染。所以 handleQuery 就算用 useCallback 包裹，也不能阻止组件重新渲染
  const handleQuery = (q: string) => {
    setQuery(q);

    if (!q) return;
    dispatch(changeEnterLoadingAction(true));
    dispatch(getSuggestListAsync(q));
  };

  // 当搜索框问空，展示热门搜索列表
  const renderHotKey = () => {
    return (
      <ul>
        {(hotList as any[]).map((item) => {
          return (
            <li
              className="item"
              key={item.first}
              onClick={() => setQuery(item.first)}
            >
              <span>{item.first}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  // 搜索框有内容
  const renderSingers = () => {
    const singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌手 </h1>
        {(singers as any[]).map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => props.router?.navigate(`/singers/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={StandImg}
                      alt="singer"
                    />
                  }
                >
                  <img
                    src={item.picUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name"> 歌手: {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  const renderAlbum = () => {
    const albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {(albums as any[]).map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => props.router?.navigate(`/album/${item.id}`)}
            >
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={StandImg}
                      alt="music"
                    />
                  }
                >
                  <img
                    src={item.coverImgUrl}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name"> 歌单: {item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };
  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: "20px" }}>
        {(songsList as any[]).map((item) => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.artists)} - {item.album.name}
                </span>
              </div>
            </li>
          );
        })}
      </SongItem>
    );
  };

  const selectItem = (
    e: React.MouseEvent<HTMLLIElement>,
    id: string | number
  ) => {
    insertSong(id);
    musicNoteRef.current?.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };
  // 初次渲染组件发送网络请求
  useEffect(() => {
    setShow(true);
    if (!hotList.length) dispatch(getHotKeyWordAsync());
  }, []);
  // query 发生改变重新发送网络请求

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => router?.navigate(-1)}
    >
      <Container songsCount={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}
          ></SearchBox>
        </div>

        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title"> 热门搜索 </h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>

        <ShortcutWrapper show={!!query}>
          <Scroll onScroll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading && <Loading />}
        <MusicNote ref={musicNoteRef} />
      </Container>
    </CSSTransition>
  );
});

export default withRouter(Search);

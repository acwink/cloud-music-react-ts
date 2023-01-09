import React, { memo, useRef, useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import style from "@/assets/theme/global-style";
import { debounce } from "@/utils/utils";
import { FunctionType } from "@/types/shared";

const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder {
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${style["background-color"]};
  }
`;

interface ISearchBoxProps {
  newQuery: string;
  handleQuery: FunctionType;
  back: FunctionType;
}

const SearchBox = memo((props: ISearchBoxProps) => {
  const queryRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  // 从父组件种拿到搜索关键词
  const { newQuery } = props;
  // 对父组件针对搜索关键字发送请求相关的数据的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示/隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  const clearQuery = () => {
    // 清空的逻辑
    setQuery("");
    queryRef.current?.focus();
  };

  useEffect(() => {
    handleQueryDebounce!(query);
  }, [query]);

  useEffect(() => {
    queryRef.current?.focus();
  }, []);

  useEffect(() => {
    // 用户点击了热门关键字
    if (query !== newQuery) setQuery(newQuery);
  }, [newQuery]);

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>
        &#xe655;
      </i>
      <input
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <i
        className="iconfont icon-delete"
        onClick={clearQuery}
        style={displayStyle}
      >
        &#xe600;
      </i>
    </SearchBoxWrapper>
  );
});

export default SearchBox;

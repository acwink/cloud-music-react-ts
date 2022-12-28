import React, { useCallback } from "react";
import { memo } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { HomeTabItemWrapper, HomeTabWrapper, HomeTopWrapper } from "./style";

const Home = memo(() => {
  const switchTabHandle = useCallback(({ isActive = false }) => {
    if (isActive) return "selected";
    return;
  }, []);

  return (
    <div>
      <HomeTopWrapper>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </HomeTopWrapper>

      <HomeTabWrapper>
        <NavLink to="/recommend" className={switchTabHandle}>
          <HomeTabItemWrapper>
            <span>推荐</span>
          </HomeTabItemWrapper>
        </NavLink>
        <NavLink to="/singers" className={switchTabHandle}>
          <HomeTabItemWrapper>
            <span>歌手</span>
          </HomeTabItemWrapper>
        </NavLink>
        <NavLink to="/rank" className={switchTabHandle}>
          <HomeTabItemWrapper>
            <span>排行榜</span>
          </HomeTabItemWrapper>
        </NavLink>
      </HomeTabWrapper>
      <Outlet />
    </div>
  );
});

export default Home;

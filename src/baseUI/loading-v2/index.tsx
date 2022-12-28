import React, { memo } from "react";
import { LoadingWrapper } from "./style";
const LoadingV2 = memo(() => {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span> 拼命加载中...</span>
    </LoadingWrapper>
  );
});

export default LoadingV2;

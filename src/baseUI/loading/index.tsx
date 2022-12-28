import React, { memo } from "react";
import { LoadingWrapper } from "./style";

const Loading = memo(() => {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
});

export default Loading;

import { FunctionType } from "@/types/shared";
import React, { ForwardedRef, forwardRef, memo } from "react";
import { HeaderContainer, MarqueeContainer } from "./style";
export const HEADER_HIGHT = 45;
interface IHeaderProps {
  handleClick?: FunctionType;
  title?: string;
  isMarquee?: boolean;
}
const Header = memo(
  forwardRef((props: IHeaderProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { handleClick, title = "标题", isMarquee = false } = props;

    return (
      <HeaderContainer ref={ref}>
        <i className="iconfont back" onClick={handleClick}>
          &#xe655;
        </i>
        {isMarquee ? (
          <MarqueeContainer>
            <h1 className="text">{title}</h1>
          </MarqueeContainer>
        ) : (
          <h1>{title}</h1>
        )}
      </HeaderContainer>
    );
  })
);

export default Header;

import styled, { keyframes } from "styled-components";

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 1000;
  display: flex;
  line-height: 40px;

  color: ${(props) => props.theme["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${(props) => props.theme["font-size-l"]};
    font-weight: 700;
  }
`;

const Marquee = keyframes`
  from {
  transform: translateX(100%);
  }
  to {
   transform: translateX(-100%);
  } 
`;

export const MarqueeContainer = styled.div`
  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;

  .text {
    position: absolute;
    animation: ${Marquee} 10s linear infinite;
  }
`;

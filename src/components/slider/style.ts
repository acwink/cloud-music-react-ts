import styled from "styled-components";

export const SliderWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: white;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background-color: ${(props) => props.theme["theme-color"]};
  }

  .slider-container {
    margin-left: 1%;

    width: 98%;
    height: 160px;
    overflow: hidden;

    border-radius: 6px;
    .slider-wrapper {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background-color: ${(props) => props.theme["theme-color"]};
    }
  }
`;

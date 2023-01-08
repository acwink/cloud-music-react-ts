import styled from "styled-components";

export const RecommendWrapper = styled.div<{ play: number }>`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  width: 100%;

  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${(props) => props.theme["theme-color"]};
  }
`;

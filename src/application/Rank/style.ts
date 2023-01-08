import styled from "styled-components";

// Props 中的 globalRank 和 tracks.length 均代表是否为全球榜

export const Container = styled.div<{ play: number }>`
  position: fixed;
  top: 90px;
  bottom: ${(props) => (props.play > 0 ? "60px" : 0)};
  width: 100%;
  .offical,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${(props) => props.theme["font-size-m"]};
    color: ${(props) => props.theme["font-color-desc"]};
  }
`;
export const List = styled.ul<{
  globalRank: boolean;
}>`
  margin-top: 10px;
  padding: 0 5px;
  display: ${(props) => (props.globalRank ? "flex" : "")};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${(props) => props.theme["background-color"]};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`;
export const ListItem = styled.li<{
  tracks: any[];
}>`
  display: ${(props) => (props.tracks.length ? "flex" : "")};
  padding: 3px 0;
  border-bottom: 1px solid ${(props) => props.theme["border-color"]};
  .img_wrapper {
    width: ${(props) => (props.tracks.length ? "27vw" : "32vw")};
    height: ${(props) => (props.tracks.length ? "27vw" : "32vw")};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient
        (hsla (0, 0%, 100%, 0), hsla (0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequecy {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${(props) => props.theme["font-size-ss"]};
      color: ${(props) => props.theme["font-color-light"]};
    }
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${(props) => props.theme["font-size-s"]};
    color: grey;
  }
`;

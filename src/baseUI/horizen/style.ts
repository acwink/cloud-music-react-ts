import styled from "styled-components";

export const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;

  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${(props) => props.theme["font-size-m"]};
    /* vertical-align: middle; */
  }
`;

export const ListItemWrapper = styled.span`
  flex: 0 0 auto;
  font-size: ${(props) => props.theme["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${(props) => props.theme["theme-color"]};
    border: 1px solid;
    opacity: 0.8;
  }
`;

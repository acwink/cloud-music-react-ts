import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import styled from "styled-components";
import style from "@/assets/theme/global-style";

const Container = styled.div`
  .icon_wrapper {
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${style["theme-color"]};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    transform: translate3d(0, 0, 0);
    > div {
      transition: transform 1s;
    }
  }
`;

const MusicNote = forwardRef((props, ref) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  const ICON_NUMBER = 10;

  const transform = "transform";

  const createNode = (txt: string) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    const tempNode = document.createElement("div");
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      const node = createNode("<div class='iconfont'>&#xe642;</div>");
      if (iconsRef.current && node) iconsRef.current.appendChild(node);
    }
    let domArray: Element[] = [];
    if (iconsRef.current) domArray = [...iconsRef.current.children];

    domArray.forEach((item) => {
      (item as any).running = false;
      item.addEventListener(
        "transitionend",
        function () {
          // @ts-expect-error
          this.style["display"] = "none";
          // @ts-expect-error
          this.style[transform] = "translate3d(0, 0, 0)";
          // @ts-expect-error
          this.running = false;
          // @ts-expect-error
          const icon = this.querySelector("div");
          icon.style[transform] = "translate3d(0, 0, 0)";
        },
        false
      );
    });
    // eslint-disable-next-line
  }, []);

  const startAnimation = ({ x, y }: { x: number; y: number }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray: Element[] = [];
      if (iconsRef.current) domArray = [...iconsRef.current.children];
      const item = domArray[i];
      // 选择一个空闲的元素来开始动画
      if ((item as any).running === false) {
        (item as any).style.left = x + "px";
        (item as any).style.top = y + "px";
        (item as any).style.display = "inline-block";
        setTimeout(() => {
          (item as any).running = true;
          (item as any).style[transform] = "translate3d(0, 750px, 0)";
          const icon = item.querySelector("div");
          if (icon) icon.style[transform] = "translate3d(-40px, 0, 0)";
        }, 20);
        break;
      }
    }
  };

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return <Container ref={iconsRef}></Container>;
});

export default React.memo(MusicNote);

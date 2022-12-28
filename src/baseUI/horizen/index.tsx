import React, { memo, useEffect, useRef } from "react";

import { FunctionType } from "@/types/shared";
import Scroll from "@/baseUI/scroll";
import { ListItemWrapper, ListWrapper } from "./style";
import classNames from "classnames";

interface IHorizenProps {
  list: any[];
  oldVal?: string;
  title: string;
  handleClick?: FunctionType;
}

const Horizen = memo((props: IHorizenProps) => {
  const { list, oldVal = "", title } = props;
  const { handleClick } = props;

  const Category = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const categoryDom = Category.current;

    if (categoryDom) {
      const tagElems = categoryDom.querySelectorAll("span");
      let totalWidth = 0;
      Array.from(tagElems).forEach((ele) => {
        totalWidth += ele.offsetWidth;
      });

      categoryDom.style.width = `${totalWidth}px`;
    }
  }, []);

  return (
    <Scroll direction="horizontal">
      <div ref={Category}>
        <ListWrapper>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItemWrapper
                key={item.key}
                className={classNames("", { selected: oldVal === item.key })}
                onClick={() => {
                  handleClick && handleClick(item.key);
                }}
              >
                {item.name}
              </ListItemWrapper>
            );
          })}
        </ListWrapper>
      </div>
    </Scroll>
  );
});

export default Horizen;

import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import BScroll from "better-scroll";

import Loading from "../loading";
import LoadingV2 from "../loading-v2";

import { FunctionType } from "../../types/shared";
import { ScrollWrapper } from "./style";
import { debounce } from "@/utils/utils";

interface IScrollProps {
  direction: "vertical" | "horizontal";
  click: boolean;
  refresh: boolean;
  onScroll: FunctionType;
  pullUp: FunctionType;
  pullDown: FunctionType;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  bounceTop: boolean;
  bounceBottom: boolean;
  children: React.ReactNode;
}

const Scroll = memo(
  forwardRef((props: Partial<IScrollProps>, ref) => {
    const {
      direction = "vertical",
      click = true,
      refresh = true,
      pullUpLoading = false,
      pullDownLoading = false,
      bounceTop = true,
      bounceBottom = true,
    } = props;
    const { onScroll, pullDown, pullUp } = props;

    const PullUpdisplayStyle = pullUpLoading
      ? { display: "" }
      : { display: "none" };
    const PullDowndisplayStyle = pullDownLoading
      ? { display: "" }
      : { display: "none" };

    // better-scroll 实例对象
    const [bScroll, setBScroll] = useState<BScroll | null>(null);

    // 初始化 bs 实例所需要的DOM 元素
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 对回调函数做防抖处理
    const pullUpDebounce = useMemo(() => debounce(pullUp, 300), [pullUp]);
    const pullDownDebounce = useMemo(() => debounce(pullDown, 300), [pullDown]);
    // 给外界暴露组件方法
    useImperativeHandle(ref, () => {
      return {
        refresh() {
          if (bScroll) {
            bScroll.refresh();
            bScroll.scrollTo(0, 0);
          }
        },

        getBScroll() {
          if (bScroll) {
            return bScroll;
          }
        },
      };
    });

    // 初始化bScroll实例
    useEffect(() => {
      const scroll = new BScroll(scrollContainerRef.current!, {
        scrollX: direction === "horizontal",
        scrollY: direction === "vertical",
        probeType: 3,
        click: click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
      });

      setBScroll(scroll);

      return () => {
        setBScroll(null);
      };
    }, []);

    // 每次重新渲染都要刷新实例防止无法滑动
    useEffect(() => {
      if (refresh && bScroll) {
        bScroll.refresh();
      }
    });

    // 给实例绑定scroll 事件
    useEffect(() => {
      if (!bScroll || !onScroll) return;
      bScroll.on("scroll", (scroll: any) => {
        onScroll(scroll);
      });
      return () => {
        bScroll.off("scroll");
      };
    }, [onScroll, bScroll]);

    // 进行上拉到底的判断，调用上拉刷新的函数
    useEffect(() => {
      if (!bScroll || !pullUp) return;
      bScroll.on("scrollEnd", () => {
        // 判断是否滑动到了底部
        if (bScroll.y <= bScroll.maxScrollY + 100) {
          pullUpDebounce && pullUpDebounce();
        }
      });
      return () => {
        bScroll.off("scrollEnd");
      };
    }, [pullUp, bScroll]);

    // 进行下拉判断，调用下拉刷新函数
    useEffect(() => {
      if (!bScroll || !pullDown) return;
      bScroll.on("touchEnd", (pos: any) => {
        // 判断用户的下拉动作
        if (pos.y > 50) {
          pullDownDebounce && pullDownDebounce();
        }
      });
      return () => {
        bScroll.off("touchEnd");
      };
    }, [pullDown, bScroll]);

    return (
      <ScrollWrapper ref={scrollContainerRef}>
        {props.children}
        {/* 下拉 */}
        <div style={PullDowndisplayStyle}>
          <Loading></Loading>
        </div>
        {/* 上拉 */}
        <div style={PullUpdisplayStyle}>
          <LoadingV2></LoadingV2>
        </div>
      </ScrollWrapper>
    );
  })
);

export default Scroll;

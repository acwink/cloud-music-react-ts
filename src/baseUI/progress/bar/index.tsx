import React, { memo, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import style from "@/assets/theme/global-style";
import { FunctionType } from "../../../types/shared";

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`;

interface IProgressBarProps {
  percent: number;
  percentChange: FunctionType;
}

const ProgressBar = memo((props: IProgressBarProps) => {
  const { percent, percentChange } = props;
  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const progressBtn = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState<Record<PropertyKey, any>>({});

  const progressBtnWidth = 4;

  const _changePercent = () => {
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const curPercent = progress.current!.clientWidth / barWidth;
    percentChange(curPercent);
  };

  // 处理进度条偏移
  const _offset = (offsetWidth: number) => {
    progress.current!.style.width = `${offsetWidth}px`;
    progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const startTouch: any = {};
    startTouch.initial = true; // true 表示开始移动了
    startTouch.startX = e.touches[0].pageX; // 滑动开始的横坐标
    startTouch.left = progress.current?.clientWidth; // 当前progress的长度
    setTouch(startTouch);
  };

  const progressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touch.initial) return;

    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(4, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };
  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initial = false;
    setTouch(endTouch);
    _changePercent();
  };

  const progressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = progressBar.current!.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  // 监听 percent 改变
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initial) {
      const barWidth = progressBar.current!.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current!.style.width = `${offsetWidth}px`;
      progressBtn.current!.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent]);

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
});

export default ProgressBar;

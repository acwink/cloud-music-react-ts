import { FunctionType } from "../types/shared";
// 用于匹配事件戳的正则表达式
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const enum PlayStatus {
  PAUSE,
  PLAYING,
}

export default class Lyric {
  lrc: string;
  lines: any[];
  handler: FunctionType;
  state: PlayStatus;
  curLineIndex: number;
  startStamp: number;
  timer?: NodeJS.Timeout;
  constructor(lrc: string, handler: FunctionType) {
    this.lrc = lrc;
    this.lines = []; // 解析后的数组，每一项包含对应的歌词和时间
    this.handler = handler; // 回调函数
    this.state = PlayStatus.PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳

    this._initLines();
  }

  _initLines() {
    // 解析代码
    const lines = this.lrc.split("\n");
    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      const result = timeExp.exec(line);
      if (!result) continue;
      const txt = line.replace(timeExp, "").trim();
      if (txt) {
        if (result[3].length === 3) {
          result[3] = Number.parseInt(result[3]) / 10 + ""; // 997 会切割成 99
        }
        this.lines.push({
          time:
            +result[1] * 60 * 1000 + +result[2] * 1000 + (+result[3] || 0) * 10, // 转换到具体的毫秒
          txt,
        });
      }
    }
    this.lines.sort((a, b) => {
      return a.time - b.time;
    }); // 根据时间从小到大排序
  }

  // offset 为时间进度， isSeek 表示用户是否手动进行调整
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) return;
    this.state = PlayStatus.PLAYING;
    // 找到当前所在的行
    this.curLineIndex = this._findcurLineIndex(offset);
    // 当前正处于 this.curlineIndex - 1行
    // 通过回调函数传递信息
    this._callHandler(this.curLineIndex - 1);
    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = Date.now() - offset;

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer);
    }
  }

  _findcurLineIndex(time: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  _callHandler(i: number) {
    if (i < 0) {
      return;
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i,
    });
  }

  //isSeek 标志位表示用户是否手动调整进度
  _playRest(isSeek = false) {
    const line = this.lines[this.curLineIndex];
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      const preTime = this.lines[this.curLineIndex - 1]
        ? this.lines[this.curLineIndex - 1].time
        : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (
        this.curLineIndex < this.lines.length &&
        this.state === PlayStatus.PLAYING
      ) {
        this._playRest();
      }
    }, delay);
  }

  togglePlay(offset: number) {
    if (this.state === PlayStatus.PLAYING) {
      this.stop();
    } else {
      this.state = PlayStatus.PLAYING;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = PlayStatus.PAUSE;
    clearTimeout(this.timer);
  }
  seek(offset: number) {
    this.play(offset, true);
  }
}

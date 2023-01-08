import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const enum playMode {
  sequence,
  loop,
  random,
}

interface IPlayerState {
  fullScreen: boolean; // 控制是否全屏
  playing: boolean; // 当前歌曲是否播放
  sequencePlayList: any; // 列表顺序
  playList: any;
  mode: playMode; // 播放模式
  currentIndex: number; // 当前播放歌曲的索引
  showPlayList: boolean; // 是否展示播放列表
  currentSong: any;
}

const initialState: IPlayerState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
};

const player = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeFullScreenAction(state, { payload }: PayloadAction<boolean>) {
      state.fullScreen = payload;
    },
    changePalyingAction(state, { payload }: PayloadAction<boolean>) {
      state.playing = payload;
    },
    changeSequencePlayListAction(state, { payload }: PayloadAction<any>) {
      state.sequencePlayList = payload;
    },
    changePlayListAction(state, { payload }: PayloadAction<any>) {
      state.playList = payload;
    },
    changeModeAction(state, { payload }: PayloadAction<playMode>) {
      state.mode = payload;
    },
    changeCurrentIndexAction(state, { payload }: PayloadAction<number>) {
      state.currentIndex = payload;
    },
    changeShowPlayListAction(state, { payload }: PayloadAction<boolean>) {
      state.showPlayList = payload;
    },
    changeCurrentSongAction(state, { payload }: PayloadAction<any>) {
      state.currentSong = payload;
    },
  },
});

export const {
  changeCurrentIndexAction,
  changeCurrentSongAction,
  changeFullScreenAction,
  changeModeAction,
  changePalyingAction,
  changePlayListAction,
  changeSequencePlayListAction,
  changeShowPlayListAction,
} = player.actions;
export default player.reducer;

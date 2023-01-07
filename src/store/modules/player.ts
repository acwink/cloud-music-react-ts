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
  sequencePlayList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ],
  playList: [
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: "01",
      crbt: null,
      no: 1,
      st: 0,
      rt: "",
      cf: "",
      alia: ["手游《梦幻花园》苏州园林版推广曲"],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814,
      },
      mv: 0,
      al: {
        id: 84991301,
        name: "拾梦纪",
        picUrl:
          "http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg",
        tns: [],
        pic_str: "109951164627180052",
        pic: 109951164627180050,
      },
      name: "拾梦纪",
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672,
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277,
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: "妖扬",
          tns: [],
          alias: [],
        },
        {
          id: 12578371,
          name: "金天",
          tns: [],
          alias: [],
        },
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null,
    },
  ],
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

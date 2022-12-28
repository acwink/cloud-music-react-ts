import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IArtist } from "@/types/singers";
import { AppDispatch, RootState } from "../index";
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from "@/api/modules/singers";

export interface ISingerState {
  singerList: IArtist[];
  enterLoading: boolean;
  pullUpLoading: boolean;
  pullDownLoading: boolean;
  pageCount: number;
}

const initialState: ISingerState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0,
};

const SingerSlice = createSlice({
  name: "singers",
  initialState,
  reducers: {
    changeSingerListAction(state, { payload }: PayloadAction<IArtist[]>) {
      state.singerList = payload;
    },
    changePageCountAction(state, { payload }: PayloadAction<number>) {
      state.pageCount = payload;
    },
    changeEnterLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.enterLoading = payload;
    },
    changePullUpLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.pullUpLoading = payload;
    },
    changePullDownLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.pullDownLoading = payload;
    },
  },
});

export const {
  changeEnterLoadingAction,
  changePageCountAction,
  changePullDownLoadingAction,
  changePullUpLoadingAction,
  changeSingerListAction,
} = SingerSlice.actions;

// 第一请求加载热门歌手数据
export const fetchHotSingerListDataAction = createAsyncThunk(
  "fetchHotSingerData",
  (_, { dispatch }) => {
    getHotSingerListRequest(0)
      .then((res) => {
        const data = res.data.artists;
        dispatch(changeSingerListAction(data));
        dispatch(changeEnterLoadingAction(false));
        dispatch(changePullDownLoadingAction(false));
      })
      .catch(() => {
        console.log("获取歌手数据失败");
      });
  }
);

// 加载更多热门歌手
export const fetchMoreHotSingerListDataAction = createAsyncThunk<
  any,
  any,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("fetchMoreHot", (_, { dispatch, getState }) => {
  const state = getState();
  const pageCount = state.singers.pageCount;
  const singerList = state.singers.singerList;
  getHotSingerListRequest(pageCount)
    .then((res) => {
      const data = [...singerList, ...res.data.artists];
      dispatch(changeSingerListAction(data));
      dispatch(changePullUpLoadingAction(false));
      dispatch(changeEnterLoadingAction(false));
    })
    .catch(() => {
      console.log("热门歌手数据获取失败");
    });
});

// 第一次加载对应类别的歌手
export const fetchSingerListDataAction = createAsyncThunk<
  any,
  {
    category: string;
    alpha: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("fetchSingerListData", ({ category, alpha }, { dispatch }) => {
  getSingerListRequest(category, alpha, 0)
    .then((res) => {
      const data = res.data.artists;
      dispatch(changeSingerListAction(data));
      dispatch(changePullUpLoadingAction(false));
      dispatch(changePullDownLoadingAction(false));
      dispatch(changeEnterLoadingAction(false));
    })
    .catch(() => {
      console.log("歌手数据获取失败");
    });

  // getSingerListRequest()
});

// 加载更多歌手
export const fetchMoreSingerListDataAction = createAsyncThunk<
  any,
  {
    category: string;
    alpha: string;
  },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("fetchMoreSingerListData", ({ category, alpha }, { dispatch, getState }) => {
  const state = getState();
  const pageCount = state.singers.pageCount;
  const singerList = state.singers.singerList;

  getSingerListRequest(category, alpha, pageCount)
    .then((res) => {
      const data = res.data.artists;
      dispatch(changeSingerListAction([...singerList, ...data]));
      dispatch(changePullUpLoadingAction(false));
    })
    .catch(() => {
      console.log("歌手数据获取失败");
    });

  // getSingerListRequest()
});

export default SingerSlice.reducer;

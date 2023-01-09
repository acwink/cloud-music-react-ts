import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from "../../api/modules/search";

interface ISearchState {
  hotList: any;
  suggestList: any;
  songsList: any;
  enterLoading: boolean;
}

const initialState: ISearchState = {
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeHotListAction(state, { payload }) {
      state.hotList = payload;
    },
    changeSuggestListAction(state, { payload }) {
      state.suggestList = payload;
    },
    changeSongsListAction(state, { payload }) {
      state.songsList = payload;
    },
    changeEnterLoadingAction(state, { payload }) {
      state.enterLoading = payload;
    },
  },
});

export const {
  changeEnterLoadingAction,
  changeHotListAction,
  changeSongsListAction,
  changeSuggestListAction,
} = searchSlice.actions;

export const getHotKeyWordAsync = createAsyncThunk(
  "hotkeyword",
  (_, { dispatch }) => {
    getHotKeyWordsRequest().then((res) => {
      const list = res.data.result.hots;
      dispatch(changeHotListAction(list));
    });
  }
);

export const getSuggestListAsync = createAsyncThunk<any, string>(
  "suggestList",
  (query, { dispatch }) => {
    getSuggestListRequest(query).then((res) => {
      const data = res.data;
      if (!data) return;
      const result = data.result ?? [];
      dispatch(changeSuggestListAction(result));
    });
    getResultSongsListRequest(query).then((res) => {
      const data = res.data;
      if (!data) return;
      const result = data.result.songs ?? [];
      dispatch(changeSongsListAction(result));
      dispatch(changeEnterLoadingAction(false)); // 关闭loading
    });
  }
);

export default searchSlice.reducer;

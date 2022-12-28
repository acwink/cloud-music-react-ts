import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IRankItem } from "@/types/rank";
import { getRankListRequest } from "../../api/modules/rank";

export interface IRankState {
  rankList: IRankItem[];
  loading: boolean;
}

export enum actionTypes {
  CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST",
  CHANGE_LOADING = "home/rank/CHANGE_LOADING",
}

const initialState: IRankState = {
  rankList: [],
  loading: true,
};

const rankSlice = createSlice({
  name: "rankSlice",
  initialState,
  reducers: {
    changeRankListAction(state, { payload }: PayloadAction<IRankItem[]>) {
      state.rankList = payload;
    },
    changeLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { changeLoadingAction, changeRankListAction } = rankSlice.actions;
export const fetchRankListDataAction = createAsyncThunk(
  "fetchRankListData",
  (_, { dispatch }) => {
    getRankListRequest()
      .then((res) => {
        dispatch(changeRankListAction(res.data.list));
        dispatch(changeLoadingAction(false));
      })
      .catch(() => {
        console.log("排行榜数据请求失败");
      });
  }
);
export default rankSlice.reducer;

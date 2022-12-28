import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBannerImage, IRecommendItem } from "@/types/recommend";
import { getBannerRequest, getRecommendRequest } from "@/api/modules/recommend";

export interface IRecommendState {
  bannerList: IBannerImage[];
  recommendList: IRecommendItem[];
  enterLoading: boolean;
}

const initialState: IRecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    changeBannerListAction(state, { payload }: PayloadAction<IBannerImage[]>) {
      state.bannerList = payload;
    },
    changeRecommendListAction(
      state,
      { payload }: PayloadAction<IRecommendItem[]>
    ) {
      state.recommendList = payload;
    },
    changeEnterLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.enterLoading = payload;
    },
  },
});

export const {
  changeBannerListAction,
  changeRecommendListAction,
  changeEnterLoadingAction,
} = recommendSlice.actions;

export const fetchRecommendDataAction = createAsyncThunk(
  "fetchRecommendData",
  (_, { dispatch }) => {
    getBannerRequest().then((res) => {
      dispatch(changeBannerListAction(res.data.banners));
    });

    getRecommendRequest().then((res) => {
      dispatch(changeRecommendListAction(res.data.result));
      dispatch(changeEnterLoadingAction(false));
    });
  }
);
export default recommendSlice.reducer;

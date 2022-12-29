import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingerInfoRequest } from "../../api/modules/singer";

interface ISingerSliceState {
  artist: any;
  songsOfArtist: any;
  loading: boolean;
}

const initialState: ISingerSliceState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

const singerSlice = createSlice({
  name: "singerSlice",
  initialState,
  reducers: {
    changeAristAction(state, { payload }) {
      state.artist = payload;
    },
    changeSongsOfArtistAction(state, { payload }) {
      state.songsOfArtist = payload;
    },
    changeLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const {
  changeAristAction,
  changeLoadingAction,
  changeSongsOfArtistAction,
} = singerSlice.actions;
export const fetchSingerInfoAction = createAsyncThunk<any, string>(
  "fetchSingerInfo",
  (id, { dispatch }) => {
    dispatch(changeLoadingAction(true));
    getSingerInfoRequest(id)
      .then((res) => {
        dispatch(changeAristAction(res.data.artist));
        dispatch(changeSongsOfArtistAction(res.data.hotSongs));
        dispatch(changeLoadingAction(false));
      })
      .catch(() => {
        console.log("singerInfo 数据请示失败");
      });
  }
);

export default singerSlice.reducer;

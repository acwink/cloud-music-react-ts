import { getAlbumDetailRequest } from "@/api/modules/album";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface IAlbumState {
  currentAlbum: any;
  enterLoading: boolean;
}

const initialState: IAlbumState = {
  currentAlbum: {},
  enterLoading: false,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    changeCurrentAlbumAction(state, { payload }) {
      state.currentAlbum = payload;
    },
    changeEnterLoadingAction(state, { payload }: PayloadAction<boolean>) {
      state.enterLoading = payload;
    },
  },
});

export const { changeCurrentAlbumAction, changeEnterLoadingAction } =
  albumSlice.actions;
export const fetchAlbumDetailDataAction = createAsyncThunk<any, number>(
  "fetchAlbum",
  (id, { dispatch }) => {
    dispatch(changeEnterLoadingAction(true));
    getAlbumDetailRequest(id)
      .then((res) => {
        dispatch(changeCurrentAlbumAction(res.data.playlist));
        dispatch(changeEnterLoadingAction(false));
      })
      .catch(() => {
        console.log("Album请求数据失败");
      });
  }
);

export default albumSlice.reducer;

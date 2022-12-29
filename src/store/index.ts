import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "./modules/recommend";
import singerReducer from "./modules/singers";
import rankReducer from "./modules/rank";
import albumReducer from "./modules/album";
const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer,
    album: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

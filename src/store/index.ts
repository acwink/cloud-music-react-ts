import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "./modules/recommend";
import singersReducer from "./modules/singers";
import rankReducer from "./modules/rank";
import albumReducer from "./modules/album";
import playerReduecer from "./modules/player";
import searchReducer from "./modules/search";

import singerReducer from "./modules/singer";
const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer,
    album: albumReducer,
    singer: singerReducer,
    player: playerReduecer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

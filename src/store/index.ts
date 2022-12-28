import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "./modules/recommend";
import singerReducer from "./modules/singers";
import rankReducer from "./modules/rank";

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from "./modules/recommend";
import singerReducer from "./modules/singers";

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    singers: singerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

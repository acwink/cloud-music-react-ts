import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "@/store/index";
import { AppDispatch } from "@/store/index";
import {
  changeCurrentIndexAction,
  changeCurrentSongAction,
} from "@/store/modules/player";
function useCurrent() {
  const { currentIndex, currentSong } = useSelector((state: RootState) => {
    return {
      currentSong: state.player.currentSong,
      currentIndex: state.player.currentIndex,
    };
  }, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const changeCurrentIndex = (data: number) => {
    dispatch(changeCurrentIndexAction(data));
  };

  const changeCurrentSong = (data: any) => {
    dispatch(changeCurrentSongAction(data));
  };

  return {
    currentIndex,
    currentSong,
    changeCurrentSong,
    changeCurrentIndex,
  };
}

export default useCurrent;

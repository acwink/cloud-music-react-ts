import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "@/store/index";
import { AppDispatch } from "@/store/index";
import { changePalyingAction } from "@/store/modules/player";
function usePlaying() {
  const { playing } = useSelector((state: RootState) => {
    return {
      playing: state.player.playing,
    };
  }, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const togglePlaying = (data: boolean) => {
    dispatch(changePalyingAction(data));
  };

  return {
    playing,
    togglePlaying,
  };
}

export default usePlaying;

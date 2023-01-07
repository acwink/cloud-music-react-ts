import { changeFullScreenAction } from "@/store/modules/player";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";

function useFullScreen() {
  const { fullScreen } = useSelector((state: RootState) => {
    return {
      fullScreen: state.player.fullScreen,
    };
  }, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const toggleFullScreen = (data: boolean) => {
    dispatch(changeFullScreenAction(data));
  };

  return { fullScreen, toggleFullScreen };
}

export default useFullScreen;

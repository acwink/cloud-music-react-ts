import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";
import { changePalyingAction } from "@/store/modules/player";

function usePlayList() {
  const { playList } = useSelector((state: RootState) => {
    return {
      playList: state.player.playList,
    };
  }, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const changePlayList = (data: any) => {
    dispatch(changePalyingAction(data));
  };

  return {
    playList,
    changePlayList,
  };
}

export default usePlayList;

import { changeShowPlayListAction } from "@/store/modules/player";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/index";

function useShowPlayList() {
  const { showPlayList } = useSelector((state: RootState) => {
    return {
      showPlayList: state.player.showPlayList,
    };
  }, shallowEqual);

  const dispatch = useDispatch<AppDispatch>();
  const toggleShowPlayList = (data: boolean) => {
    dispatch(changeShowPlayListAction(data));
  };

  return { toggleShowPlayList, showPlayList };
}

export default useShowPlayList;

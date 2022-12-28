import React, { useReducer, createContext, ReactNode } from "react";

export const CategoryDataContext = createContext<{
  data?: IDataState;
  dispatch?: React.Dispatch<ReducerAction>;
}>({});

// 相当于之前的 constants
export enum actionTypes {
  CHANGE_CATEGORY = "singers/CHANGE_CATEGORY",
  CHANGE_ALPHA = "singers/CHANGE_ALPHA",
}

interface IDataState {
  category: string;
  alpha: string;
}

type ReducerAction = {
  type: actionTypes;
  data: string;
};

const reducer = (state: IDataState, action: ReducerAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return { ...state, category: action.data };
    case actionTypes.CHANGE_ALPHA:
      return { ...state, alpha: action.data };
    default:
      return state;
  }
};

interface IDataProps {
  children?: ReactNode;
}
export const Data = (props: IDataProps) => {
  const [data, dispatch] = useReducer(reducer, {
    category: "",
    alpha: "",
  });

  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};

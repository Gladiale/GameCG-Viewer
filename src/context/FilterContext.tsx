import { createContext, useContext, useReducer } from "react";
import { allFilter, type FilterType } from "../data/allInfo";

/* 参考サイト
https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
https://qiita.com/akifumii/items/88fb13959a2184174473
https://juejin.cn/post/7088242996004519967
*/

type ContextType = {
  state: FilterType;
  dispatch: React.Dispatch<FilterActionType>;
};

type FilterActionType = {
  type: string;
  payload: { effectData: number; allEffect?: FilterType };
};

const initialState = allFilter;
function reducer(state: FilterType, action: FilterActionType) {
  switch (action.type) {
    case "brightness":
      return { ...state, brightness: action.payload.effectData };
    case "contrast":
      return { ...state, contrast: action.payload.effectData };
    case "grayscale":
      return { ...state, grayscale: action.payload.effectData };
    case "hueRotate":
      return { ...state, hueRotate: action.payload.effectData };
    case "invert":
      return { ...state, invert: action.payload.effectData };
    case "saturate":
      return { ...state, saturate: action.payload.effectData };
    case "sepia":
      return { ...state, sepia: action.payload.effectData };
    case "apply":
      return { ...state, ...action.payload.allEffect };
    case "reset":
      return initialState;
    default:
      throw new Error("不明なactionです");
  }
}

const FilterContext = createContext({} as ContextType);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilter };

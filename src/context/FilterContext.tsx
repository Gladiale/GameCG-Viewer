import { createContext, useContext, useReducer } from "react";
import { FilterType, allFilter } from "../data/allInfo";

/* 参考サイト
https://qiita.com/Rascal823/items/0f53ffbb410505b707f8
https://qiita.com/akifumii/items/88fb13959a2184174473
https://juejin.cn/post/7088242996004519967
*/

type ContextType = {
  state: FilterType;
  dispatch: React.Dispatch<{
    type: string;
    payload: { effectData: number; allEffect?: FilterType };
  }>;
};

const FilterContext = createContext({} as ContextType);

const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    (
      prev: FilterType,
      {
        type,
        payload,
      }: {
        type: string;
        payload: { effectData: number; allEffect?: FilterType };
      }
    ) => {
      switch (type) {
        case "brightness":
          return { ...prev, brightness: payload.effectData };
        case "contrast":
          return { ...prev, contrast: payload.effectData };
        case "grayscale":
          return { ...prev, grayscale: payload.effectData };
        case "hueRotate":
          return { ...prev, hueRotate: payload.effectData };
        case "invert":
          return { ...prev, invert: payload.effectData };
        case "saturate":
          return { ...prev, saturate: payload.effectData };
        case "sepia":
          return { ...prev, sepia: payload.effectData };
        case "apply":
          return { ...prev, ...payload.allEffect };
        case "reset":
          return { ...allFilter };
        default:
          throw new Error("不明なactionです");
      }
    },
    allFilter
  );

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

import { createContext, useContext, useReducer } from "react";

/* 参考サイト
https://www.lcoding.club/ts-react-tutorials-04-usereducer/
*/

type ScreenModeType = {
  cardMode: boolean;
  mangaMode: boolean;
  cgMode: boolean;
};

const screenMode: ScreenModeType = {
  cardMode: true,
  mangaMode: false,
  cgMode: false,
};

type ContextType = {
  screenState: ScreenModeType;
};
type ContextDispatchType = {
  screenDispatch: React.Dispatch<{
    type: string;
  }>;
};

const ScreenContext = createContext({} as ContextType);
const ScreenDispatchContext = createContext({} as ContextDispatchType);

// ここのtypeは分割代入の値
function screenReducer(state: ScreenModeType, { type }: { type: string }) {
  switch (type) {
    case "cardMode":
      return { ...state, cardMode: false, mangaMode: true };
    case "mangaMode":
      return { ...state, mangaMode: false, cgMode: true };
    case "cgMode":
      return { ...state, cgMode: false, cardMode: true };
    default:
      throw new Error("不明なアクションです");
  }
}

const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenState, screenDispatch] = useReducer(screenReducer, screenMode);

  return (
    <ScreenContext.Provider value={{ screenState }}>
      <ScreenDispatchContext.Provider value={{ screenDispatch }}>
        {children}
      </ScreenDispatchContext.Provider>
    </ScreenContext.Provider>
  );
};

const useScreenState = () => {
  return useContext(ScreenContext);
};
const useScreenDispatch = () => {
  return useContext(ScreenDispatchContext);
};

export { ScreenProvider, useScreenState, useScreenDispatch };

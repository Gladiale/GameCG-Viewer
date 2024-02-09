import { useState } from "react";
import styles from "./CardFilter.module.css";
import { useFilter } from "../../context/FilterContext";
import { useScreenState } from "../../context/ScreenContext";

type AllProps = {
  isPixelate: boolean;
  setIsPixelate: React.Dispatch<React.SetStateAction<boolean>>;
  setHasFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardFilter = ({ data }: { data: AllProps }) => {
  const { isPixelate, setIsPixelate, setHasFilter } = data;

  // console.count("再リンダリングしました");

  const { screenState } = useScreenState();

  const { state, dispatch } = useFilter();

  const handleEffect = (
    e: React.ChangeEvent<HTMLInputElement>,
    effectName: string
  ) => {
    dispatch({
      type: effectName,
      payload: { effectData: Number(e.target.value) },
    });
    setHasFilter(true);
  };

  /*
  brightness()：画像の明るさを調整
  contrast()：画像のコントラストを調整
  grayscale()：画像をグレースケールに変換。
  blur()：画像にぼかし効果を加える
  saturate()：画像の彩度を変更
  sepia()：画像にセピア調の効果をかける

  多分デフォルト
  filter: `brightness(100%) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%) sepia(0%)`
  多分最大値
  filter: `brightness(1000%) contrast(800%) grayscale(100%) hue-rotate(360deg) invert(100%) saturate(1000%) sepia(100%)`
   */

  const [copyMessage, setCopyMessage] = useState<string>("データ取得");
  const [applyMessage, setApplyMessage] = useState<string>("データ適応");
  const [filterStatusNumber, setFilterStatusNumber] = useState<number>(0);

  const copyFilterStatus = () => {
    const filterDataJson = JSON.stringify(state);

    navigator.clipboard.writeText(filterDataJson);
    setCopyMessage("取得成功");
    setTimeout(() => {
      setCopyMessage("データ取得");
    }, 1000);
  };

  const applyFilterStatus = async () => {
    try {
      const response = await fetch("/filterData.json");
      const fetchData = await response.json();

      const setFilterData = (listNumber: number): void => {
        if (listNumber < fetchData.length) {
          setFilterStatusNumber((prev) => prev + 1);
          dispatch({
            type: "apply",
            payload: { effectData: 0, allEffect: fetchData[listNumber] },
          });

          setHasFilter(true);
          setApplyMessage(`リスト番号「${listNumber}番」適応成功`);
          setTimeout(() => {
            setApplyMessage("データ適応");
          }, 1000);
        } else {
          setFilterStatusNumber(0);
          setFilterData(0);
        }
      };
      setFilterData(filterStatusNumber);
    } catch (error) {
      console.error(error);
      setApplyMessage("fetchに失敗しました");
    }
  };

  const resetFilterStatus = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch({ type: "reset", payload: { effectData: 0 } });

    setHasFilter(false);
    setApplyMessage("ステータスをリセットしました");
    setTimeout(() => {
      setApplyMessage("データ適応");
    }, 1000);
  };

  return (
    <div
      className={styles.menuFilter}
      style={{
        transform: screenState.cgMode
          ? "translateX(-120%) translateY(-52%)"
          : undefined,
      }}
    >
      <label>
        <span>brightness</span>
        <input
          type="range"
          min="40"
          max="300"
          value={state.brightness}
          onChange={(e) => handleEffect(e, "brightness")}
        />
      </label>

      <label>
        <span>contrast</span>
        <input
          type="range"
          min="10"
          max="500"
          value={state.contrast}
          onChange={(e) => handleEffect(e, "contrast")}
        />
      </label>

      <label>
        <span>grayscale</span>
        <input
          type="range"
          min="0"
          max="100"
          value={state.grayscale}
          onChange={(e) => handleEffect(e, "grayscale")}
        />
      </label>

      <label>
        <span>hue-rotate</span>
        <input
          type="range"
          min="0"
          max="360"
          value={state.hueRotate}
          onChange={(e) => handleEffect(e, "hueRotate")}
        />
      </label>

      <label>
        <span>invert</span>
        <input
          type="range"
          min="0"
          max="100"
          value={state.invert}
          onChange={(e) => handleEffect(e, "invert")}
        />
      </label>

      <label>
        <span>saturate</span>
        <input
          type="range"
          min="0"
          max="600"
          value={state.saturate}
          onChange={(e) => handleEffect(e, "saturate")}
        />
      </label>

      <label>
        <span>sepia</span>
        <input
          type="range"
          min="0"
          max="100"
          value={state.sepia}
          onChange={(e) => handleEffect(e, "sepia")}
        />
      </label>

      <label>
        <span>PixelateEffect</span>
        <input
          type="checkbox"
          checked={isPixelate}
          onChange={() => setIsPixelate((prev) => !prev)}
        />
      </label>

      <div className={styles.filterControl} data-message="右クリックリセット">
        <input
          type="button"
          value={applyMessage}
          onClick={applyFilterStatus}
          onContextMenu={resetFilterStatus}
        />
        <input type="button" value={copyMessage} onClick={copyFilterStatus} />
      </div>
    </div>
  );
};

export default CardFilter;

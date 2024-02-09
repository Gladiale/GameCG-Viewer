import { useState } from "react";
import styles from "../Card/Card.module.css";
import { getVoiceList } from "../../data/getFileList";
import { useScreenState } from "../../context/ScreenContext";

type AllProps = {
  postOpacity: boolean;
  hasVideo: boolean;
  swirl: boolean;
  isFullScreen: boolean;
  rotateList: number[];
  rotate: number;
  standImgURL: string;
  hasVocal: boolean;
  setHasVocal: React.Dispatch<React.SetStateAction<boolean>>;
  hasMirrorEffect: boolean;
  isPictureMode: boolean;
  getRandomInt: (max: number) => number;
};

const CardStandImage = ({ data }: { data: AllProps }) => {
  const {
    postOpacity,
    hasVideo,
    swirl,
    isFullScreen,
    rotateList,
    rotate,
    standImgURL,
    hasVocal,
    setHasVocal,
    hasMirrorEffect,
    isPictureMode,
    getRandomInt,
  } = data;

  const { screenState } = useScreenState();

  const [vocal, setVocal] = useState<string>("");

  const handleVocal = (e: any) => {
    e.stopPropagation();
    // ランダムなボイスを取得
    const voiceFileList: string[] = getVoiceList();
    const voiceFile = voiceFileList[getRandomInt(voiceFileList.length)];
    setVocal(`/voice/${voiceFile}`);
    setHasVocal(true);
  };

  return (
    <div
      className={`${styles.img_box} ${
        postOpacity
          ? hasVideo
            ? styles.standDesignAtVideo
            : styles.standDesignChange
          : undefined
      } ${swirl ? styles["to_back"] : styles["to_front"]}`}
      style={
        postOpacity
          ? {
              position: "absolute",
              // right: `${
              //   isFullScreen && isWidthScreen
              //     ? "4%"
              //     : isWidthScreen
              //     ? "-10%"
              //     : rotateList.includes(rotate)
              //     ? "-77%"
              //     : "-21%"
              // }`,
              left: `${
                isFullScreen && screenState.cgMode
                  ? "5%"
                  : screenState.cgMode
                  ? "4%"
                  : rotateList.includes(rotate)
                  ? "-78%"
                  : hasMirrorEffect
                  ? "-14%"
                  : "-22%"
              }`,
              overflow: "visible",
            }
          : { overflow: "hidden" }
      }
    >
      {postOpacity ? (
        <div
          className={styles.stand_image}
          style={{
            height:
              screenState.cgMode || screenState.mangaMode ? "100dvh" : "100%",
            display: isPictureMode ? "none" : undefined,
            opacity: screenState.cgMode ? "0" : undefined,
          }}
        >
          <img src={standImgURL.split("'")[1]} onClick={handleVocal} />
          {hasVocal && (
            <audio
              src={`${vocal}`}
              autoPlay
              onEnded={() => setHasVocal((prev) => !prev)}
            ></audio>
          )}
        </div>
      ) : (
        <div
          className={styles.stand_image}
          style={{
            background: `${standImgURL} no-repeat center center / contain`,
            aspectRatio: "1 / 1",
          }}
        ></div>
      )}
    </div>
  );
};

export default CardStandImage;

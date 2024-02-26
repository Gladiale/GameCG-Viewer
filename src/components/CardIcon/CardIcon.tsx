import { useEffect, useState } from "react";
import styles from "./CardIcon.module.css";
import {
  BsChevronRight,
  BsChevronLeft,
  BsArrowThroughHeart,
  BsArrowThroughHeartFill,
} from "react-icons/bs";
import { MdOutlineDoNotTouch } from "react-icons/md";
import {
  GiStarSwirl,
  GiCardPlay,
  GiAbstract024,
  GiHeartBattery,
  GiFairyWand,
  GiNestedHearts,
  GiEclipseFlare,
  GiCosmicEgg,
  GiPostStamp,
  GiSpellBook,
  GiTiedScroll,
} from "react-icons/gi";
import { InfoType } from "../../data/allInfo";
import {
  getPostList,
  getStandList,
  getVideoList,
  getVoiceList,
} from "../../data/getFileList";
import CardFilter from "../CardFilter/CardFilter";
import { useScreenDispatch, useScreenState } from "../../context/ScreenContext";
import { getEffectImgList } from "../../data/getEffectImgList";

type AllProps = {
  allInfo: InfoType;
  setPostImgURL: React.Dispatch<React.SetStateAction<string>>;
  setStandImgURL: React.Dispatch<React.SetStateAction<string>>;
  setVideoURL: React.Dispatch<React.SetStateAction<string>>;
  setPostFile: React.Dispatch<React.SetStateAction<string>>;
  setStandFile: React.Dispatch<React.SetStateAction<string>>;
  setVideoFile: React.Dispatch<React.SetStateAction<string>>;
  postOpacity: boolean;
  hasVideo: boolean;
  isTilt: boolean;
  setIsTilt: React.Dispatch<React.SetStateAction<boolean>>;
  filterMenu: boolean;
  setFilterMenu: React.Dispatch<React.SetStateAction<boolean>>;
  swirl: boolean;
  setSwirl: React.Dispatch<React.SetStateAction<boolean>>;
  rotate: number;
  rotateList: number[];
  setRotateY: React.Dispatch<React.SetStateAction<number>>;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setVoiceFile: React.Dispatch<React.SetStateAction<string>>;
  hasMirrorEffect: boolean;
  setHasMirrorEffect: React.Dispatch<React.SetStateAction<boolean>>;

  isPixelate: boolean;
  setIsPixelate: React.Dispatch<React.SetStateAction<boolean>>;
  setHasFilter: React.Dispatch<React.SetStateAction<boolean>>;

  hasCgEffect: boolean;
  effectPosition: string;
  setHasCgEffect: React.Dispatch<React.SetStateAction<boolean>>;
  setEffectURL: React.Dispatch<React.SetStateAction<string>>;
  setEffectPosition: React.Dispatch<React.SetStateAction<string>>;
};

const CardIcon = ({ data }: { data: AllProps }) => {
  const {
    allInfo,
    setPostImgURL,
    setStandImgURL,
    setVideoURL,
    setPostFile,
    setStandFile,
    setVideoFile,
    postOpacity,
    hasVideo,
    isTilt,
    setIsTilt,
    filterMenu,
    setFilterMenu,
    swirl,
    setSwirl,
    rotate,
    rotateList,
    setRotateY,
    isFullScreen,
    setIsFullScreen,
    setVoiceFile,
    hasMirrorEffect,
    setHasMirrorEffect,

    isPixelate,
    setIsPixelate,
    setHasFilter,

    hasCgEffect,
    effectPosition,
    setHasCgEffect,
    setEffectURL,
    setEffectPosition,
  } = data;

  const { screenState } = useScreenState();
  const { screenDispatch } = useScreenDispatch();

  // voiceを加えました
  const [hasVoice, setHasVoice] = useState<boolean>(false);
  const [voiceURL, setVoiceURL] = useState<string>(
    `/voice/${allInfo.voicePlayFile}`
  );

  // インクリメント関数
  function incrementAll(postOpacity: boolean, hasVideo: boolean): void {
    if (!postOpacity) {
      // インクリメント (立ち絵)
      const standFileList: string[] = getStandList(allInfo.standFolder);
      const standIndex: number = standFileList.indexOf(allInfo.standImgFile);
      if (standIndex < standFileList.length - 1) {
        allInfo.standImgFile = standFileList[standIndex + 1];
        setStandImgURL(
          `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
        );
        setStandFile(String(standIndex + 2).padStart(3, "0"));
      } else {
        allInfo.standImgFile = standFileList[0];
        setStandImgURL(
          `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
        );
        setStandFile("001");
      }
    } else if (!hasVideo) {
      // インクリメント (画像)
      const postFileList: string[] = getPostList(allInfo.postFolder);
      const postIndex: number = postFileList.indexOf(allInfo.postImgFile);
      if (postIndex < postFileList.length - 1) {
        allInfo.postImgFile = postFileList[postIndex + 1];
        setPostImgURL(
          `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
        );
        setPostFile(String(postIndex + 2).padStart(3, "0"));
      } else {
        allInfo.postImgFile = postFileList[0];
        setPostImgURL(
          `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
        );
        setPostFile("001");
      }
    } else {
      // インクリメント (動画)
      const videoFileList: string[] = getVideoList(allInfo.videoFolder);
      const videoIndex: number = videoFileList.indexOf(allInfo.videoPlayFile);
      if (videoIndex < videoFileList.length - 1) {
        allInfo.videoPlayFile = videoFileList[videoIndex + 1];
        setVideoURL(
          `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
        );
        setVideoFile(String(videoIndex + 2).padStart(3, "0"));
      } else {
        allInfo.videoPlayFile = videoFileList[0];
        setVideoURL(
          `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
        );
        setVideoFile("001");
      }
    }
  }

  const handleToRight = (e: any) => {
    e.stopPropagation();
    incrementAll(postOpacity, hasVideo);
  };

  const handleToLeft = (e: any) => {
    e.stopPropagation();
    if (!postOpacity) {
      // デクリメント (立ち絵)
      const standFileList: string[] = getStandList(allInfo.standFolder);
      const standIndex: number = standFileList.indexOf(allInfo.standImgFile);
      switch (standIndex) {
        case 0:
          allInfo.standImgFile = standFileList.slice(-1)[0];
          setStandImgURL(
            `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
          );
          setStandFile(String(standFileList.length).padStart(3, "0"));
          break;
        default:
          allInfo.standImgFile = standFileList[standIndex - 1];
          setStandImgURL(
            `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
          );
          setStandFile(String(standIndex).padStart(3, "0"));
      }
    } else if (!hasVideo) {
      // デクリメント (画像)
      const postFileList: string[] = getPostList(allInfo.postFolder);
      const postIndex: number = postFileList.indexOf(allInfo.postImgFile);
      switch (postIndex) {
        case 0:
          allInfo.postImgFile = postFileList.slice(-1)[0];
          setPostImgURL(
            `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
          );
          setPostFile(String(postFileList.length).padStart(3, "0"));
          break;
        default:
          allInfo.postImgFile = postFileList[postIndex - 1];
          setPostImgURL(
            `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
          );
          setPostFile(String(postIndex).padStart(3, "0"));
      }
    } else {
      // デクリメント (動画)
      const videoFileList: string[] = getVideoList(allInfo.videoFolder);
      const videoIndex: number = videoFileList.indexOf(allInfo.videoPlayFile);
      switch (videoIndex) {
        case 0:
          allInfo.videoPlayFile = videoFileList.slice(-1)[0];
          setVideoURL(
            `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
          );
          setVideoFile(String(videoFileList.length).padStart(3, "0"));
          break;
        default:
          allInfo.videoPlayFile = videoFileList[videoIndex - 1];
          setVideoURL(
            `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
          );
          setVideoFile(String(videoIndex).padStart(3, "0"));
      }
    }
  };

  const handleToFirst = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!postOpacity) {
      // (立ち絵)
      const standImageName: string = getStandList(allInfo.standFolder)[0];
      setStandImgURL(
        `url('/stand-image/folder-${allInfo.standFolder}/${standImageName}')`
      );
      setStandFile("001");
      allInfo.standImgFile = standImageName;
    } else if (!hasVideo) {
      // (CG画像)
      const pictureName: string = getPostList(allInfo.postFolder)[0];
      setPostImgURL(
        `url('/post-image/folder-${allInfo.postFolder}/${pictureName}')`
      );
      setPostFile("001");
      allInfo.postImgFile = pictureName;
    } else {
      // (動画)
      const videoName: string = getVideoList(allInfo.videoFolder)[0];
      setVideoURL(`/video/folder-${allInfo.videoFolder}/${videoName}`);
      setVideoFile("001");
      allInfo.videoPlayFile = videoName;
    }
  };

  const handleToLast = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!postOpacity) {
      // (立ち絵)
      const standList: string[] = getStandList(allInfo.standFolder);
      const standImageName: string = standList.slice(-1)[0];
      setStandImgURL(
        `url('/stand-image/folder-${allInfo.standFolder}/${standImageName}')`
      );
      setStandFile(String(standList.length).padStart(3, "0"));
      allInfo.standImgFile = standImageName;
    } else if (!hasVideo) {
      // (CG画像)
      const postList: string[] = getPostList(allInfo.postFolder);
      const pictureName: string = postList.slice(-1)[0];
      setPostImgURL(
        `url('/post-image/folder-${allInfo.postFolder}/${pictureName}')`
      );
      setPostFile(String(postList.length).padStart(3, "0"));
      allInfo.postImgFile = pictureName;
    } else {
      // (動画)
      const videoList: string[] = getVideoList(allInfo.videoFolder);
      const videoName: string = videoList.slice(-1)[0];
      setVideoURL(`/video/folder-${allInfo.videoFolder}/${videoName}`);
      setVideoFile(String(videoList.length).padStart(3, "0"));
      allInfo.videoPlayFile = videoName;
    }
  };

  const handleTilt = (e: any) => {
    e.stopPropagation();
    setIsTilt((prev) => !prev);
  };

  const handleFilterMenu = (e: any) => {
    e.stopPropagation();
    filterMenu ? setFilterMenu(false) : setFilterMenu(true);
  };

  // カット全体Y軸180度回転
  const handleSwirl = (e: any) => {
    e.stopPropagation();
    if (swirl) {
      setSwirl(false);
      setRotateY(360);
    } else {
      setSwirl(true);
      setRotateY(180);
    }
    // swirl ? setSwirl(false) : setSwirl(true);
  };

  // 画面モードを変更
  const handleScreen = (
    e: React.MouseEvent<HTMLInputElement>,
    modeName: string
  ) => {
    e.stopPropagation();
    screenDispatch({ type: modeName });
  };

  // 自動画像変換
  const [autoChange, setAutoChange] = useState<boolean>(false);
  const [changeSpeed, setChangeSpeed] = useState<number>(40);
  const handleAutoMatic = (e: any) => {
    e.stopPropagation();
    setAutoChange((prev) => !prev);
  };
  const handleChangeSpeed = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (changeSpeed === 40) {
      setChangeSpeed(450);
    } else if (changeSpeed !== 40 && changeSpeed < 1350) {
      setChangeSpeed((prev) => (prev += 450));
    } else {
      setChangeSpeed(40);
    }
    // console.log(changeSpeed);
  };
  useEffect(() => {
    // console.log("init");
    let intervalId: number | undefined;
    if (autoChange) {
      // console.log("time start");
      intervalId = window.setInterval(() => {
        // console.log("interval running");
        incrementAll(postOpacity, hasVideo);
      }, changeSpeed);
    }
    return () => {
      window.clearInterval(intervalId);
      // console.log("end");
    };
  }, [autoChange, changeSpeed]);

  // ボイスの開きしめ
  const handleVoice = (e: any) => {
    e.stopPropagation();
    hasVoice ? setHasVoice(false) : setHasVoice(true);
  };
  // ボイスの置き換え
  const rightClickVoice = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    // ボイスのインクリメント
    const voiceFileList: string[] = getVoiceList();
    const voiceIndex = voiceFileList.indexOf(allInfo.voicePlayFile);
    if (voiceIndex < voiceFileList.length - 1) {
      allInfo.voicePlayFile = voiceFileList[voiceIndex + 1];
    } else {
      allInfo.voicePlayFile = voiceFileList[0];
    }
    setVoiceURL(`/voice/${allInfo.voicePlayFile}`);
    setVoiceFile(allInfo.voicePlayFile);
  };

  // フルスクリーン(https://gray-code.com/javascript/display-the-page-in-full-screen/)
  // コンポーネント外の操作は副作用なので、useEffectを使います
  const handleFullScreen = (e: any) => {
    e.stopPropagation();
    setIsFullScreen((prev) => !prev);
  };
  useEffect(() => {
    if (document.fullscreenElement === null && isFullScreen) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement !== null) {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  // ミラー効果
  const handleMirrorEffect = (e: any) => {
    e.stopPropagation();
    setHasMirrorEffect((prev) => !prev);
  };

  // CG-Effect
  const handleCgEffect = (e: any) => {
    e.stopPropagation();
    if (hasCgEffect) {
      setEffectPosition("center");
    }
    setHasCgEffect((prev) => !prev);
  };

  // CG-Effect 画像変更
  const rightClickCgEffect = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    // Effect画像のインクリメント
    const effectImgList: string[] = getEffectImgList();
    const effectIndex = effectImgList.indexOf(allInfo.effectImgFile);
    if (effectIndex < effectImgList.length - 1) {
      allInfo.effectImgFile = effectImgList[effectIndex + 1];
    } else {
      allInfo.effectImgFile = effectImgList[0];
    }
    setEffectURL(`url('/effect/${allInfo.effectImgFile}')`);
  };

  // CG-Effect position変更
  const handleEffectPosition = (e: any, parameter: string) => {
    e.stopPropagation();
    setEffectPosition(parameter);
  };

  return (
    <div
      className={styles.icons}
      style={{
        right:
          screenState.cgMode && postOpacity
            ? "1.5dvw"
            : !screenState.cgMode && hasVideo
            ? "-355px"
            : "-15px",
        transform:
          rotateList.includes(rotate) && postOpacity && screenState.cardMode
            ? "translateX(270px)"
            : rotateList.includes(rotate) &&
              postOpacity &&
              screenState.mangaMode
            ? "translateX(40dvh)"
            : undefined,
      }}
    >
      <div
        className={`${styles.iconSetTop} ${
          isFullScreen && screenState.cgMode
            ? styles["full-cg-screen"]
            : undefined
        }`}
      >
        <GiEclipseFlare onClick={handleFullScreen} />

        {autoChange ? (
          <div className={styles["autoMatic-box"]}>
            <GiHeartBattery
              onClick={handleAutoMatic}
              onContextMenu={handleChangeSpeed}
              className={styles.autoMatic}
            />
            <p>
              {changeSpeed === 450
                ? "normal"
                : changeSpeed === 900
                ? "middle"
                : changeSpeed === 1350
                ? "low"
                : "Animation"}
            </p>
          </div>
        ) : (
          <GiHeartBattery onClick={handleAutoMatic} />
        )}

        <BsChevronRight onClick={handleToRight} onContextMenu={handleToLast} />
        <BsChevronLeft onClick={handleToLeft} onContextMenu={handleToFirst} />

        {hasVoice ? (
          <div className={styles["voice-box"]}>
            <GiNestedHearts
              onClick={handleVoice}
              onContextMenu={rightClickVoice}
              className={styles.toggleVoice}
            />
            <audio controls src={`${voiceURL}`} autoPlay loop></audio>
          </div>
        ) : (
          <GiNestedHearts onClick={handleVoice} />
        )}

        {hasCgEffect ? (
          <div className={styles["CG-Effect"]}>
            <BsArrowThroughHeartFill
              onClick={handleCgEffect}
              onContextMenu={rightClickCgEffect}
            />
            <div
              className={styles.checkEffect}
              style={{
                transform: screenState.cgMode
                  ? "translateY(-20%) translateX(-110%)"
                  : "translateY(-20%) translateX(25%)",
              }}
            >
              <div
                className={
                  effectPosition == "left top, center"
                    ? styles.active
                    : undefined
                }
                onClick={(e) => handleEffectPosition(e, "left top, center")}
              >
                左上
              </div>
              <div
                className={
                  effectPosition == "center" ? styles.active : undefined
                }
                onClick={(e) => handleEffectPosition(e, "center")}
              >
                中央
              </div>
              <div
                className={
                  effectPosition == "right bottom, center"
                    ? styles.active
                    : undefined
                }
                onClick={(e) => handleEffectPosition(e, "right bottom, center")}
              >
                右下
              </div>
            </div>
          </div>
        ) : (
          <BsArrowThroughHeart onClick={handleCgEffect} />
        )}
      </div>

      <div
        className={`${styles.iconSetBottom} ${
          isFullScreen && screenState.cgMode
            ? styles["full-cg-screen"]
            : undefined
        }`}
      >
        {screenState.cardMode && (
          <GiPostStamp
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              handleScreen(e, "cardMode")
            }
          />
        )}
        {screenState.mangaMode && (
          <GiSpellBook
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              handleScreen(e, "mangaMode")
            }
          />
        )}
        {screenState.cgMode && (
          <GiTiedScroll
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              handleScreen(e, "cgMode")
            }
          />
        )}

        <GiStarSwirl onClick={handleSwirl} />

        {!filterMenu ? (
          <GiFairyWand onClick={handleFilterMenu} />
        ) : (
          <div className={styles["filter-box"]}>
            <MdOutlineDoNotTouch onClick={handleFilterMenu} />
            <CardFilter
              data={{
                isPixelate,
                setIsPixelate,
                setHasFilter,
              }}
            />
          </div>
        )}

        <GiAbstract024
          onClick={handleMirrorEffect}
          className={hasMirrorEffect ? styles.mirrorButton : undefined}
        />

        {isTilt ? (
          <GiCardPlay onClick={handleTilt} />
        ) : (
          <GiCosmicEgg onClick={handleTilt} />
        )}
      </div>
    </div>
  );
};

export default CardIcon;

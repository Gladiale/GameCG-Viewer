import { useState } from "react";
import styles from "./CardIcon.module.css";
import {
  BsChevronRight,
  BsChevronLeft,
  // BsArrowThroughHeart,
  // BsArrowThroughHeartFill,
} from "react-icons/bs";
import { MdOutlineDoNotTouch } from "react-icons/md";
import {
  GiStarSwirl,
  GiCardPlay,
  GiAbstract024,
  // GiVortex,
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
};

// 自動画像変換 (setIntervalの戻り値はここに書くのが重要です)
// let autoChange: boolean = false;
let autoMatic: number;
let changeSpeed: number;

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
        setStandFile(allInfo.standImgFile);
      } else {
        allInfo.standImgFile = standFileList[0];
        setStandImgURL(
          `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
        );
        setStandFile(allInfo.standImgFile);
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
        setPostFile(allInfo.postImgFile);
      } else {
        allInfo.postImgFile = postFileList[0];
        setPostImgURL(
          `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
        );
        setPostFile(allInfo.postImgFile);
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
        setVideoFile(allInfo.videoPlayFile);
      } else {
        allInfo.videoPlayFile = videoFileList[0];
        setVideoURL(
          `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
        );
        setVideoFile(allInfo.videoPlayFile);
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
          setStandFile(allInfo.standImgFile);
          break;
        default:
          allInfo.standImgFile = standFileList[standIndex - 1];
          setStandImgURL(
            `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
          );
          setStandFile(allInfo.standImgFile);
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
          setPostFile(allInfo.postImgFile);
          break;
        default:
          allInfo.postImgFile = postFileList[postIndex - 1];
          setPostImgURL(
            `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
          );
          setPostFile(allInfo.postImgFile);
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
          setVideoFile(allInfo.videoPlayFile);
          break;
        default:
          allInfo.videoPlayFile = videoFileList[videoIndex - 1];
          setVideoURL(
            `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
          );
          setVideoFile(allInfo.videoPlayFile);
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
      setStandFile(standImageName);
      allInfo.standImgFile = standImageName;
    } else if (!hasVideo) {
      // (CG画像)
      const pictureName: string = getPostList(allInfo.postFolder)[0];
      setPostImgURL(
        `url('/post-image/folder-${allInfo.postFolder}/${pictureName}')`
      );
      setPostFile(pictureName);
      allInfo.postImgFile = pictureName;
    } else {
      // (動画)
      const videoName: string = getVideoList(allInfo.videoFolder)[0];
      setVideoURL(`/video/folder-${allInfo.videoFolder}/${videoName}`);
      setVideoFile(videoName);
      allInfo.videoPlayFile = videoName;
    }
  };

  const handleToLast = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!postOpacity) {
      // (立ち絵)
      const standImageName: string = getStandList(allInfo.standFolder).slice(
        -1
      )[0];
      setStandImgURL(
        `url('/stand-image/folder-${allInfo.standFolder}/${standImageName}')`
      );
      setStandFile(standImageName);
      allInfo.standImgFile = standImageName;
    } else if (!hasVideo) {
      // (CG画像)
      const pictureName: string = getPostList(allInfo.postFolder).slice(-1)[0];
      setPostImgURL(
        `url('/post-image/folder-${allInfo.postFolder}/${pictureName}')`
      );
      setPostFile(pictureName);
      allInfo.postImgFile = pictureName;
    } else {
      // (動画)
      const videoName: string = getVideoList(allInfo.videoFolder).slice(-1)[0];
      setVideoURL(`/video/folder-${allInfo.videoFolder}/${videoName}`);
      setVideoFile(videoName);
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

  // 横のモード、cardのwidthを72vw、heightを99vhに変更
  // const handleWidthScreen = (e: any) => {
  //   e.stopPropagation();
  //   isWidthScreen ? setIsWidthScreen(false) : setIsWidthScreen(true);
  // };
  const handleScreen = (
    e: React.MouseEvent<HTMLInputElement>,
    modeName: string
  ) => {
    e.stopPropagation();
    screenDispatch({ type: modeName });
  };

  // 自動画像変換
  const [autoChange, setAutoChange] = useState<boolean>(true);
  const handleAutoMatic = (e: any) => {
    e.stopPropagation();
    if (autoChange) {
      autoMatic = setInterval(() => {
        incrementAll(postOpacity, hasVideo);
      }, 40);
    } else {
      clearInterval(autoMatic);
    }
    autoChange ? setAutoChange(false) : setAutoChange(true);
    changeSpeed = 0;
  };

  const handleChangeSpeed = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (changeSpeed < 1350) {
      changeSpeed += 450;
    } else {
      changeSpeed = 450;
    }
    // console.log(changeSpeed);

    clearInterval(autoMatic);
    autoMatic = setInterval(() => {
      incrementAll(postOpacity, hasVideo);
    }, changeSpeed);
  };

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
  const handleFullScreen = (e: any) => {
    e.stopPropagation();
    if (!isFullScreen) {
      document.body.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // ミラー効果
  const handleMirrorEffect = (e: any) => {
    e.stopPropagation();
    setHasMirrorEffect((prev) => !prev);
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

        {!autoChange ? (
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
        {/* <GiVortex onClick={handleWidthScreen} /> */}

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

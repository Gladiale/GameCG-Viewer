import { useState } from "react";
import styles from "./Card.module.css";
import CardIcon from "../CardIcon/CardIcon";
import CardStandImage from "../CardStandImage/CardStandImage";
import CardVideo from "../CardVideo/CardVideo";
import { allInfo } from "../../data/allInfo";
import { useFilter } from "../../context/FilterContext";
import { useScreenState } from "../../context/ScreenContext";
// バックエンドがないため、これを代替
import {
  getPostList,
  getStandList,
  getVideoList,
} from "../../data/getFileList";

// ランダムな値を取得;
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

type PropsType = {
  tiltState: [
    isTilt: boolean,
    setIsTilt: React.Dispatch<React.SetStateAction<boolean>>
  ];
};

const Card = ({ tiltState }: PropsType) => {
  // 分割代入
  const [isTilt, setIsTilt] = tiltState;

  const { screenState } = useScreenState();

  // console.count("再リンダリングしました。");

  const [postImgURL, setPostImgURL] = useState<string>("");
  const [standImgURL, setStandImgURL] = useState<string>(
    `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
  );
  const [videoURL, setVideoURL] = useState<string>("");

  const [postOpacity, setPostOpacity] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(true);
  const [hasVideo, setHasVideo] = useState<boolean>(false);

  // spanタグの方に現れる文字です
  const [postFile, setPostFile] = useState<string>(allInfo.postImgFile);
  const [standFile, setStandFile] = useState<string>(allInfo.standImgFile);
  const [videoFile, setVideoFile] = useState<string>(allInfo.videoPlayFile);
  // 画像などのエフェクト
  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [hasFilter, setHasFilter] = useState<boolean>(false);
  // 画像などのY軸回転
  const [swirl, setSwirl] = useState<boolean>(false);
  const [rotateY, setRotateY] = useState<number>(0);
  // Post画像の回転
  const [rotate, setRotate] = useState<number>(0);
  const rotateList: number[] = [
    -90, -270, -450, -630, -810, -990, -1170, -1350,
  ];
  // Videoの360度回転
  const [rotateVideo, setRotateVideo] = useState<number>(0);

  // voiceを加えました
  const [voiceFile, setVoiceFile] = useState<string>(allInfo.voicePlayFile);

  // フルスクリーンの画面サイズ
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // videoのscale調整
  const [videoScale, setVideoScale] = useState<number>(1);

  // 立ち絵をクリック時のボイス
  const [hasVocal, setHasVocal] = useState<boolean>(false);

  // 画像のピクセル化
  const [isPixelate, setIsPixelate] = useState<boolean>(false);

  // Cardのミラー効果
  const [hasMirrorEffect, setHasMirrorEffect] = useState<boolean>(false);

  // FilterEffect
  const filterState = useFilter().state;

  // Cardにマウスの右クリック
  const handleRightClickStyle = (e: any) => {
    e.preventDefault();

    if (!postOpacity) {
      setPostImgURL(
        `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
      );
      setPostOpacity(true);
      setDisplay(false);

      setVideoURL(
        `/video/folder-${allInfo.videoFolder}/${allInfo.videoPlayFile}`
      );
      setHasVideo(true);
    } else {
      setDisplay(true);
      setPostOpacity(false);
      setHasVideo(false);
      setHasVocal(false);
      // 画像操作のMODEを解除
      setIsPictureMode(false);
      setPicturePosition({
        x: 0,
        y: 0,
      });
    }

    if (!hasVideo) {
      setRotate(0);
    } else {
      setRotateVideo(0);
    }
  };

  // Cardにマウスの左クリック(Post画像または動画を90度ずつ回転)
  const handleLeftClickStyle = () => {
    if (!filterMenu) {
      if (!hasVideo) {
        if (!postOpacity) {
          setPostImgURL(
            `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
          );
          setPostOpacity(true);
          setDisplay(false);
        } else {
          if (rotate <= -1350) {
            setRotate(0);
          } else {
            setRotate(rotate - 90);
          }
        }
      } else {
        if (rotateVideo <= -1350) {
          setRotateVideo(0);
        } else {
          setRotateVideo((prev) => prev - 90);
        }
      }
    }
  };

  const handleIncrement = (e: any) => {
    e.stopPropagation();
    // インクリメント
    const postFileList: string[] = getPostList(allInfo.postFolder);
    const postIndex: number = postFileList.indexOf(allInfo.postImgFile);
    if (postIndex < postFileList.length - 1) {
      allInfo.postImgFile = postFileList[postIndex + 1];
      setPostFile(allInfo.postImgFile);
    } else {
      allInfo.postImgFile = postFileList[0];
      setPostFile(allInfo.postImgFile);
    }

    const videoFileList: string[] = getVideoList(allInfo.videoFolder);
    const videoIndex: number = videoFileList.indexOf(allInfo.videoPlayFile);
    if (videoIndex < videoFileList.length - 1) {
      allInfo.videoPlayFile = videoFileList[videoIndex + 1];
      setVideoFile(allInfo.videoPlayFile);
    } else {
      allInfo.videoPlayFile = videoFileList[0];
      setVideoFile(allInfo.videoPlayFile);
    }
  };

  const handleRandom = (e: any) => {
    e.stopPropagation();
    // ランダムなフォルダと画像を取得
    allInfo.postFolder = String(
      getRandomInt(Number(allInfo.maxPostFolder)) + 1
    ).padStart(2, "0");
    const postFileList: string[] = getPostList(allInfo.postFolder);
    allInfo.postImgFile = postFileList[getRandomInt(postFileList.length)];

    // ランダムな立ち絵を取得
    allInfo.standFolder = String(
      getRandomInt(Number(allInfo.maxStandFolder)) + 1
    ).padStart(2, "0");
    const standFileList: string[] = getStandList(allInfo.standFolder);
    allInfo.standImgFile = standFileList[getRandomInt(standFileList.length)];

    // ランダムなフォルダと動画を取得
    allInfo.videoFolder = String(
      getRandomInt(Number(allInfo.maxVideoFolder)) + 1
    ).padStart(2, "0");
    const videoFileList: string[] = getVideoList(allInfo.videoFolder);
    allInfo.videoPlayFile = videoFileList[getRandomInt(videoFileList.length)];

    // ランダムなボイスを取得
    // const voiceFileList: string[] = getVoiceList();
    // allInfo.voicePlayFile = voiceFileList[getRandomInt(voiceFileList.length)];
    // setVoiceURL(`/voice/${allInfo.voicePlayFile}`);
    // setVoiceFile(allInfo.voicePlayFile);

    setPostImgURL(
      `url('/post-image/folder-${allInfo.postFolder}/${allInfo.postImgFile}')`
    );
    setStandImgURL(
      `url('/stand-image/folder-${allInfo.standFolder}/${allInfo.standImgFile}')`
    );
    setDisplay(false);
    setPostOpacity(true);

    setPostFile(allInfo.postImgFile);
    setStandFile(allInfo.postImgFile);
    setVideoFile(allInfo.videoPlayFile);
  };

  // 画像のマウス操作
  const [isPictureMode, setIsPictureMode] = useState<boolean>(false);
  const [pictureScale, setPictureScale] = useState<number>(1.5);
  const [picturePosition, setPicturePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const triggerPictureMode = (e: any) => {
    if (e.button === 1) {
      setIsPictureMode((prev) => !prev);
      setPicturePosition({
        x: 0,
        y: 0,
      });
      setPictureScale(1.5);
    }
  };

  const enterPictureMode = (e: any) => {
    if (isPictureMode) {
      // e.target.clientWidth, e.target.clientHeightはtarget対象の横幅と縦幅
      // console.log(e.target.clientWidth, e.target.clientHeight);
      // console.log(e.nativeEvent.layerX, e.nativeEvent.layerY);

      const maxMoveX =
        (e.target.clientWidth * pictureScale - e.target.clientWidth) / 2;
      const maxMoveY =
        (e.target.clientHeight * pictureScale - e.target.clientHeight) / 2;

      const positionX: number =
        -(
          Math.floor(e.nativeEvent.layerX - e.target.clientWidth / 2) /
          e.target.clientWidth
        ) * maxMoveX;
      const positionY: number =
        -(
          Math.floor(e.nativeEvent.layerY - e.target.clientHeight / 2) /
          e.target.clientHeight
        ) * maxMoveY;

      // const positionX: number =
      //   (e.nativeEvent.offsetX -
      //     (e.target.clientWidth * pictureScale - e.target.clientWidth)) /
      //   pictureScale;
      // const positionY: number =
      //   (e.nativeEvent.offsetY -
      //     (e.target.clientHeight * pictureScale - e.target.clientHeight)) /
      //   pictureScale;

      setPicturePosition({
        x: positionX,
        y: positionY,
      });
    }
  };

  const changeScale = (e: any) => {
    if (isPictureMode) {
      if (e.deltaY > 0) {
        setPictureScale((prev) => Number((prev - 0.1).toFixed(1)));
      } else {
        setPictureScale((prev) => Number((prev + 0.1).toFixed(1)));
      }
    }
  };

  return (
    <div
      className={`
        ${styles.card} 
        ${screenState.cardMode ? styles["card-mode"] : undefined}
        ${screenState.mangaMode ? styles["manga-mode"] : undefined}
        ${screenState.cgMode && !postOpacity ? styles["cg-mode-1"] : undefined}
        ${screenState.cgMode && postOpacity ? styles["cg-mode-2"] : undefined}
        ${
          hasMirrorEffect && screenState.mangaMode && !hasVideo
            ? styles.mirrorEffectManga
            : undefined
        }
        ${
          hasMirrorEffect && screenState.cardMode && !hasVideo
            ? styles.mirrorEffectCard
            : undefined
        }
      `}
      // カスタム変数の当て方 https://zenn.dev/kopaneet/articles/2d9e4062aba801
      // style={{
      //   ["--clr1" as any]: "#ff1d1d",
      //   ["--clr2" as any]: "#ff3be2",
      // }}
      style={{
        filter: hasFilter
          ? postOpacity && !hasVideo
            ? `drop-shadow(0 0 5px #86fff3) drop-shadow(0 0 15px #fc3eff) brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
            : `brightness(${filterState.brightness}%) contrast(${filterState.contrast}%) grayscale(${filterState.grayscale}%) hue-rotate(${filterState.hueRotate}deg) invert(${filterState.invert}%) saturate(${filterState.saturate}%) sepia(${filterState.sepia}%)`
          : undefined,
        imageRendering: isPixelate ? "pixelated" : undefined,
        overflow: isPictureMode ? "hidden" : undefined,
      }}
      onClick={handleLeftClickStyle}
      onContextMenu={handleRightClickStyle}
    >
      <div
        className={`${styles.post_image} ${
          postOpacity
            ? hasVideo
              ? undefined
              : styles.postHoverChange
            : undefined
        } ${swirl ? styles["to_back"] : styles["to_front"]}`}
        style={{
          backgroundImage: `${postImgURL}`,
          opacity: postOpacity ? 1 : 0,
          scale:
            rotateList.includes(rotate) && postOpacity && isPictureMode
              ? String(pictureScale + 0.5)
              : rotateList.includes(rotate) && postOpacity
              ? "1.5"
              : isPictureMode
              ? String(pictureScale)
              : "1",
          transform: `rotate(${rotate}deg) rotateY(${rotateY}deg)
          translate(${picturePosition.x}px, ${picturePosition.y}px)`,
        }}
        onMouseDown={triggerPictureMode}
        onMouseMove={enterPictureMode}
        onWheel={changeScale}
      ></div>

      <CardStandImage
        data={{
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
        }}
      />

      {hasVideo && (
        <CardVideo
          videoURL={videoURL}
          rotateVideo={rotateVideo}
          swirl={swirl}
          videoSize={[videoScale, setVideoScale]}
        />
      )}

      <div
        className={styles.clip}
        style={{ display: display ? "block" : "none" }}
      >
        <span></span>
        <span
          onClick={handleIncrement}
          data-str={`立ち絵「${allInfo.standFolder}-${
            standFile.split(".")[0]
          }」`}
        ></span>
        <span></span>
        <span
          onClick={handleRandom}
          data-str={`ボイス「${voiceFile.split(".")[0]}」画像「${
            allInfo.postFolder
          }-${postFile.split(".")[0]}」動画「${allInfo.videoFolder}-${
            videoFile.split(".")[0]
          }」`}
        ></span>
      </div>

      <CardIcon
        data={{
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
        }}
      />
    </div>
  );
};

export default Card;

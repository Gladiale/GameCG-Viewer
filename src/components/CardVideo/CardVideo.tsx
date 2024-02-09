import { useScreenState } from "../../context/ScreenContext";
import styles from "../Card/Card.module.css";
import iconStyles from "./CardVideo.module.css";
import { GiContract, GiEmptyHourglass, GiExpand } from "react-icons/gi";

const CardVideo = ({
  videoURL,
  rotateVideo,
  swirl,
  videoSize,
}: {
  videoURL: string;
  rotateVideo: number;
  swirl: boolean;
  videoSize: [
    videoScale: number,
    setVideoScale: React.Dispatch<React.SetStateAction<number>>
  ];
}) => {
  // 分割代入
  const [videoScale, setVideoScale] = videoSize;

  const { screenState } = useScreenState();

  const handleRest = (e: any) => {
    e.stopPropagation();
    setVideoScale(1);
  };

  const handleDown = (e: any) => {
    e.stopPropagation();
    setVideoScale((prev: number) => prev - 0.1);
  };

  const handleUp = (e: any) => {
    e.stopPropagation();
    setVideoScale((prev: number) => prev + 0.1);
  };

  return (
    <div
      className={`${styles.video_box} ${
        swirl ? styles["to_back"] : styles["to_front"]
      }`}
    >
      <video
        loop
        autoPlay
        src={`${videoURL}`}
        style={{
          scale: String(videoScale),
          transform: `rotate(${rotateVideo}deg)`,
        }}
        className={screenState.cgMode ? styles["cg-screen"] : undefined}
      ></video>
      <div className={iconStyles["video-icons"]}>
        <GiExpand onClick={handleUp} />
        <GiEmptyHourglass onClick={handleRest} />
        <GiContract onClick={handleDown} />
      </div>
    </div>
  );
};

export default CardVideo;

type InfoType = {
  postFolder: string;
  standFolder: string;
  videoFolder: string;

  maxPostFolder: number;
  maxStandFolder: number;
  maxVideoFolder: number;

  postImgFile: string;
  standImgFile: string;
  videoPlayFile: string;
  voicePlayFile: string;
};

const allInfo: InfoType = {
  postFolder: "01",
  standFolder: "01",
  videoFolder: "01",

  maxPostFolder: 3,
  maxStandFolder: 1,
  maxVideoFolder: 1,

  postImgFile: "001.png",
  standImgFile: "001.png",
  videoPlayFile: "001.mkv",
  voicePlayFile: "001.mp3",
};

type FilterType = {
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
};

const allFilter: FilterType = {
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  saturate: 100,
  sepia: 0,
};

export { allInfo, allFilter, type InfoType, type FilterType };

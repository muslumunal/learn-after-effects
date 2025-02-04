// Varsayılan ders verilerini tutan dosya
import { Ders, AltKonu } from "../models/DersModel";

export const defaultDersler = [
  {
    id: 1,
    key: "basicTools",
    color: "#FF6B6B",
    bgColor: "#FFE4E1",
    altKonular: [
      {
        id: 1,
        key: "selectionTool",
        videoId: "q2ZF29z_XGg",
        tamamlandi: true,
        aciklama: "Açıklama",
      },
      {
        id: 2,
        key: "drawingTool",
        videoId: "q2ZF29z_XGg",
        tamamlandi: false,
        aciklama: "Açıklama",
      },
      {
        id: 3,
        key: "shapeTools",
        videoId: "q2ZF29z_XGg",
        tamamlandi: false,
        aciklama: "Açıklama",
      },
    ],
  },
  {
    id: 2,
    key: "animationTechniques",
    color: "#4169E1",
    bgColor: "#E6E6FA",
    altKonular: [
      {
        id: 1,
        key: "positionAnimation",
        videoId: "def789",
        tamamlandi: true,
        aciklama: "Lorem ipsum dolor sit amet",
      },
      {
        id: 2,
        key: "scaleAnimation",
        videoId: "ghi012",
        tamamlandi: false,
        aciklama: "Lorem ipsum dolor sit amet",
      },
    ],
  },
  {
    id: 3,
    key: "cameraMovements",
    color: "#FFA500",
    bgColor: "#FFEFD5",
    altKonular: [],
  },
  {
    id: 4,
    key: "effects",
    color: "#32CD32",
    bgColor: "#F0FFF0",
    altKonular: [
      {
        id: 1,
        key: "greenScreen",
        videoId: "ghi012",
        tamamlandi: false,
        aciklama: "Açıklama",
      },
      {
        id: 2,
        key: "blueScreen",
        videoId: "ghi012",
        tamamlandi: false,
        aciklama: "Açıklama",
      },
    ],
  },
  {
    id: 5,
    key: "textOperations",
    color: "#FF69B4",
    bgColor: "#FFE4E1",
    altKonular: [],
  },
  {
    id: 6,
    key: "sampleApplications",
    color: "#9370DB",
    bgColor: "#E6E6FA",
    altKonular: [],
  },
  {
    id: 7,
    key: "externalLibraries",
    color: "#20B2AA",
    bgColor: "#E0FFFF",
    altKonular: [],
  },
  {
    id: 8,
    key: "advancedTechniques",
    color: "#FF8C00",
    bgColor: "#FFDAB9",
    altKonular: [],
  },
];

// Varsayılan ders verilerini tutan dosya
import { Ders, AltKonu } from "../models/DersModel";

export const defaultDersler = [
  new Ders(1, "Temel Araçlar", "#FF6B6B", "#FFE4E1", [
    new AltKonu(
      1,
      "Seçim Aracı(Selection Tool)",
      "q2ZF29z_XGg",
      true,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ),
    new AltKonu(
      2,
      "Çizim Aracı(Drawing Tool)",
      "q2ZF29z_XGg",
      false,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ),
    // ... diğer alt konular
  ]),
  new Ders(2, "Animasyon Teknikleri", "#4169E1", "#E6E6FA", [
    new AltKonu(
      1,
      "Position Animation",
      "def789",
      true,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    ),
    new AltKonu(
      2,
      "Scale Animation",
      "ghi012",
      false,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ),
  ]),
  // ... diğer dersler
];

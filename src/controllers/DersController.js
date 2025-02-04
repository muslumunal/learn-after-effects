// Ders işlemlerini yöneten controller
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultDersler } from "../data/defaultDersler";

export class DersController {
  static async loadDersler() {
    try {
      const savedDersler = await AsyncStorage.getItem("dersler");
      if (savedDersler) {
        return JSON.parse(savedDersler);
      }
      // İlk kez yükleniyorsa varsayılan dersleri kaydet
      await AsyncStorage.setItem("dersler", JSON.stringify(defaultDersler));
      return defaultDersler;
    } catch (error) {
      console.error("Dersler yüklenirken hata:", error);
      return [];
    }
  }

  static async konuyuTamamla(dersler, konuId, altKonuId) {
    try {
      const updatedDersler = dersler.map((konu) => {
        if (konu.id === konuId) {
          return {
            ...konu,
            altKonular: konu.altKonular.map((altKonu) => {
              if (altKonu.id === altKonuId) {
                return { ...altKonu, tamamlandi: true };
              }
              return altKonu;
            }),
          };
        }
        return konu;
      });

      await AsyncStorage.setItem("dersler", JSON.stringify(updatedDersler));
      return updatedDersler;
    } catch (error) {
      console.error("Konu tamamlanırken hata:", error);
      return dersler;
    }
  }
}

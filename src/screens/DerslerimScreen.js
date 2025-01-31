import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DerslerimScreen = ({ navigation }) => {
  const [dersler, setDersler] = useState([
    {
      id: 1,
      baslik: "JavaScript Temelleri",
      tamamlandi: false,
      altKonular: [
        {
          id: 1,
          baslik: "Değişkenler ve Veri Tipleri",
          tamamlandi: false,
          videoId: "xyz123", // YouTube video ID
          aciklama:
            "Bu derste JavaScript'te değişkenler ve veri tiplerini öğreneceksiniz.",
        },
        {
          id: 2,
          baslik: "Fonksiyonlar",
          tamamlandi: false,
          videoId: "abc456",
          aciklama:
            "JavaScript'te fonksiyonların kullanımını ve önemini öğreneceksiniz.",
        },
      ],
    },
    {
      id: 2,
      baslik: "React Native Giriş",
      tamamlandi: false,
      altKonular: [
        {
          id: 1,
          baslik: "Component Yapısı",
          tamamlandi: false,
          videoId: "def789",
          aciklama:
            "React Native'de component yapısını ve yaşam döngüsünü öğreneceksiniz.",
        },
        {
          id: 2,
          baslik: "Props ve State",
          tamamlandi: false,
          videoId: "ghi012",
          aciklama:
            "Props ve State kavramlarını detaylı olarak öğreneceksiniz.",
        },
      ],
    },
  ]);

  const [expandedKonu, setExpandedKonu] = useState(null);

  // Uygulama açıldığında kayıtlı verileri yükle
  useEffect(() => {
    loadSavedProgress();
  }, []);

  // Kayıtlı ilerlemeyi yükle
  const loadSavedProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem("derslerProgress");
      if (savedProgress) {
        setDersler(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("İlerleme yüklenirken hata oluştu:", error);
    }
  };

  // İlerlemeyi kaydet
  const saveProgress = async (updatedDersler) => {
    try {
      await AsyncStorage.setItem(
        "derslerProgress",
        JSON.stringify(updatedDersler)
      );
    } catch (error) {
      console.error("İlerleme kaydedilirken hata oluştu:", error);
    }
  };

  const handleKonuTamamla = (konuId, altKonuId) => {
    setDersler((prevDersler) => {
      const updatedDersler = prevDersler.map((konu) => {
        if (konu.id === konuId) {
          return {
            ...konu,
            altKonular: konu.altKonular.map((altKonu) => {
              if (altKonu.id === altKonuId) {
                return {
                  ...altKonu,
                  tamamlandi: true,
                };
              }
              return altKonu;
            }),
          };
        }
        return konu;
      });

      // İlerlemeyi kaydet
      saveProgress(updatedDersler);
      return updatedDersler;
    });
  };

  const toggleKonu = (konuId) => {
    setExpandedKonu(expandedKonu === konuId ? null : konuId);
  };

  const konuTamamlandiMi = (konu) => {
    return konu.altKonular.every((alt) => alt.tamamlandi);
  };

  return (
    <ScrollView style={styles.container}>
      {dersler.map((konu) => (
        <View key={konu.id} style={styles.konuContainer}>
          <TouchableOpacity
            style={[
              styles.konuBaslik,
              konuTamamlandiMi(konu) && styles.tamamlandiBackground,
            ]}
            onPress={() => toggleKonu(konu.id)}
          >
            <Text style={styles.konuBaslikText}>{konu.baslik}</Text>
            <Icon
              name={
                expandedKonu === konu.id
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              size={24}
              color="#333"
            />
          </TouchableOpacity>

          {expandedKonu === konu.id && (
            <View style={styles.altKonularContainer}>
              {konu.altKonular.map((altKonu) => (
                <TouchableOpacity
                  key={altKonu.id}
                  style={[
                    styles.altKonu,
                    altKonu.tamamlandi && styles.tamamlandiBackground,
                  ]}
                  onPress={() =>
                    navigation.navigate("KonuDetay", {
                      konu: altKonu.baslik,
                      videoId: altKonu.videoId,
                      aciklama: altKonu.aciklama,
                      konuId: konu.id,
                      altKonuId: altKonu.id,
                      tamamlandi: altKonu.tamamlandi,
                      onTamamla: handleKonuTamamla,
                    })
                  }
                >
                  <Text style={styles.altKonuText}>{altKonu.baslik}</Text>
                  {altKonu.tamamlandi && (
                    <Icon name="check-circle" size={20} color="#34C759" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  konuContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  konuBaslik: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  konuBaslikText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  altKonularContainer: {
    padding: 10,
  },
  altKonu: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  altKonuText: {
    fontSize: 16,
  },
  tamamlandiBackground: {
    backgroundColor: "#e8fff0",
  },
});

export default DerslerimScreen;

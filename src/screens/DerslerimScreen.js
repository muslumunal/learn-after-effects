import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 45) / 2; // 2 sütun için

const DerslerimScreen = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [dersler, setDersler] = useState([
    {
      id: 1,
      baslik: "Temel Araçlar",
      color: "#FF6B6B",
      bgColor: "#FFE4E1",
      altKonular: [
        {
          id: 1,
          baslik: "Seçim Aracı(Selection Tool)",
          videoId: "q2ZF29z_XGg",
          tamamlandi: true,
          aciklama: "Açıklama",
        },
        {
          id: 2,
          baslik: "Çizim Aracı(Drawing Tool)",
          videoId: "q2ZF29z_XGg",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
        {
          id: 3,
          baslik: "Şekil Araçları(Shape Tools)",
          videoId: "q2ZF29z_XGg",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
        {
          id: 4,
          baslik: "Şekil Araçları(Shape Tools)",
          videoId: "q2ZF29z_XGg",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
      ],
    },
    {
      id: 2,
      baslik: "Animasyon Teknikleri",
      color: "#4169E1",
      bgColor: "#E6E6FA",
      altKonular: [
        {
          id: 1,
          baslik: "Position Animation",
          videoId: "def789",
          tamamlandi: true,
          aciklama: "Açıklama",
        },
        {
          id: 2,
          baslik: "Scale Animation",
          videoId: "ghi012",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
      ],
    },
    {
      id: 3,
      baslik: "Kamera Hareketleri",
      dersCount: "5 konu",
      color: "#FFA500",
      bgColor: "#FFEFD5",
      altKonular: [],
    },
    {
      id: 4,
      baslik: "Efektler",
      dersCount: "8 konu",
      color: "#32CD32",
      bgColor: "#F0FFF0",
      altKonular: [
        {
          id: 1,
          baslik: "Green Screen",
          videoId: "ghi012",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
        {
          id: 2,
          baslik: "Blue Screen",
          videoId: "ghi012",
          tamamlandi: false,
          aciklama: "Açıklama",
        },
      ],
    },
    {
      id: 5,
      baslik: "Yazı İşlemleri",
      dersCount: "7 konu",
      color: "#FF69B4",
      bgColor: "#FFE4E1",
      altKonular: [],
    },
    {
      id: 6,
      baslik: "Örnek Uygulamalar",
      dersCount: "6 konu",
      color: "#9370DB",
      bgColor: "#E6E6FA",
      altKonular: [],
    },
    {
      id: 7,
      baslik: "Harici Kütüphaneler",
      dersCount: "4 konu",
      color: "#20B2AA",
      bgColor: "#E0FFFF",
      altKonular: [],
    },
    {
      id: 8,
      baslik: "İleri Teknikler",
      dersCount: "3 konu",
      color: "#FF8C00",
      bgColor: "#FFDAB9",
      altKonular: [],
    },
  ]);

  // Konuyu tamamlama fonksiyonu
  const handleKonuTamamla = (konuId, altKonuId) => {
    setDersler((prevDersler) =>
      prevDersler.map((konu) => {
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
      })
    );
  };

  // Arama sonuçlarını filtreleyen fonksiyon
  const filteredDersler = dersler.filter((konu) =>
    konu.baslik.toLowerCase().includes(searchText.toLowerCase())
  );

  // Alt konuların sayısını ve tamamlananları hesaplayan fonksiyon
  const getKonuDurumu = (altKonular) => {
    const toplamKonu = altKonular.length;
    const tamamlanan = altKonular.filter((konu) => konu.tamamlandi).length;
    return `${tamamlanan}/${toplamKonu} konu`;
  };

  // Güncelleme parametrelerini dinliyoruz
  useEffect(() => {
    if (route.params?.konuGuncellendi) {
      handleKonuTamamla(
        route.params.guncelKonuId,
        route.params.guncelAltKonuId
      );
    }
  }, [route.params?.konuGuncellendi]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hoş Geldiniz!</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Konu ara..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#666"
          autoCapitalize="none" // Büyük/küçük harf duyarlılığı için
          autoCorrect={false} // Otomatik düzeltmeyi kapatır
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.courseList}>
        <View style={styles.coursesGrid}>
          {filteredDersler.length > 0 ? (
            filteredDersler.map((konu) => (
              <TouchableOpacity
                key={konu.id}
                style={[styles.courseCard, { backgroundColor: konu.bgColor }]}
                onPress={() =>
                  navigation.navigate("AltKonular", {
                    konuBaslik: konu.baslik,
                    altKonular: konu.altKonular,
                    konuId: konu.id,
                    onTamamla: handleKonuTamamla,
                    konuRenk: konu.color,
                  })
                }
              >
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle}>{konu.baslik}</Text>
                  <Text style={styles.courseCount}>
                    {getKonuDurumu(konu.altKonular)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.courseDecoration,
                    { backgroundColor: konu.color },
                  ]}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultContainer}>
              <Text style={styles.noResultText}>
                "{searchText}" ile ilgili konu bulunamadı
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    margin: 20,
    padding: 12,
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  courseList: {
    flex: 1,
  },
  coursesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  courseCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.8,
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  courseContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  courseCount: {
    fontSize: 14,
    color: "#666",
  },
  courseDecoration: {
    position: "absolute",
    bottom: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.3,
  },
  noResultContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  noResultText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default DerslerimScreen;

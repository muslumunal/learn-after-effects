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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DersController } from "../controllers/DersController";
import { useTranslation } from "react-i18next";
import "../translations/i18n";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 45) / 2; // 2 sütun için

const DerslerimScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dersler, setDersler] = useState([]);

  useEffect(() => {
    const initializeApp = async () => {
      // Önce kaydedilmiş dili yükle
      const savedLanguage = await DersController.loadLanguage();
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);

      // Sadece dersleri temizle ve yeniden yükle
      await AsyncStorage.removeItem("dersler");
      loadDersler();
    };

    initializeApp();
  }, []);

  const loadDersler = async () => {
    const loadedDersler = await DersController.loadDersler();
    setDersler(loadedDersler);
  };

  const handleKonuTamamla = async (konuId, altKonuId) => {
    const updatedDersler = await DersController.konuyuTamamla(
      dersler,
      konuId,
      altKonuId
    );
    setDersler(updatedDersler);
  };

  // Arama sonuçlarını filtreleyen fonksiyon
  const filteredDersler = dersler.filter((konu) =>
    t(`courses.${konu.key}.title`)
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // Alt konuların sayısını ve tamamlananları hesaplayan fonksiyon
  const getKonuDurumu = (altKonular) => {
    const toplamKonu = altKonular.length;
    const tamamlanan = altKonular.filter((konu) => konu.tamamlandi).length;
    return `${tamamlanan}/${toplamKonu} konu`;
  };

  // Güncelleme parametrelerini dinliyoruz
  useEffect(() => {
    const updateKonu = async () => {
      if (route.params?.konuGuncellendi) {
        await handleKonuTamamla(
          route.params.guncelKonuId,
          route.params.guncelAltKonuId
        );
      }
    };

    updateKonu();
  }, [route.params?.konuGuncellendi]);

  const languages = [
    { code: "tr", label: "Türkçe" },
    { code: "en", label: "English" },
  ];

  const changeLanguage = async (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    setIsLanguageDropdownOpen(false);
    // Seçilen dili kaydet
    await DersController.saveLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{t("welcome")}</Text>

        {/* Yeni dil seçici */}
        <View style={styles.languageSelector}>
          <TouchableOpacity
            style={styles.languageDropdown}
            onPress={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            <Text style={styles.selectedLanguage}>
              {languages.find((lang) => lang.code === currentLanguage)?.label}
            </Text>
            <Icon
              name={
                isLanguageDropdownOpen
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              size={24}
              color="#666"
            />
          </TouchableOpacity>

          {isLanguageDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.dropdownItem,
                    currentLanguage === lang.code && styles.activeDropdownItem,
                  ]}
                  onPress={() => changeLanguage(lang.code)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      currentLanguage === lang.code &&
                        styles.activeDropdownText,
                    ]}
                  >
                    {lang.label}
                  </Text>
                  {currentLanguage === lang.code && (
                    <Icon name="check" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder={t("searchPlaceholder")}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#666"
          autoCapitalize="none"
          autoCorrect={false}
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
                    konuBaslik: t(`courses.${konu.key}.title`),
                    altKonular: konu.altKonular.map((altKonu) => ({
                      ...altKonu,
                      baslik: altKonu.key
                        ? t(`courses.${konu.key}.lessons.${altKonu.key}`)
                        : altKonu.baslik,
                    })),
                    konuId: konu.id,
                    onTamamla: handleKonuTamamla,
                    konuRenk: konu.color,
                  })
                }
              >
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle}>
                    {t(`courses.${konu.key}.title`)}
                  </Text>
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
                {t("noResults", { searchText })}
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
    paddingTop: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  languageSelector: {
    zIndex: 1000,
  },
  languageDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLanguage: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 140,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeDropdownItem: {
    backgroundColor: "#F5F5F5",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  activeDropdownText: {
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default DerslerimScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const AltKonularScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const {
    konuBaslik,
    altKonular: initialAltKonular = [],
    konuId,
    onTamamla,
    konuRenk,
  } = route.params || {};

  const [altKonular, setAltKonular] = useState(initialAltKonular);

  // Alt konular güncellendiğinde state'i güncelle
  useEffect(() => {
    setAltKonular(initialAltKonular);
  }, [initialAltKonular]);

  // Konuyu tamamlama işlemi
  const handleKonuTamamla = (konuId, altKonuId) => {
    onTamamla(konuId, altKonuId);
    setAltKonular((prevAltKonular) =>
      prevAltKonular.map((altKonu) => {
        if (altKonu.id === altKonuId) {
          return { ...altKonu, tamamlandi: true };
        }
        return altKonu;
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.headerBg, { backgroundColor: `${konuRenk}15` }]} />
        <View
          style={[styles.headerContent, { backgroundColor: `${konuRenk}15` }]}
        />
        <View
          style={[styles.decorCircle1, { backgroundColor: `${konuRenk}30` }]}
        />
        <View
          style={[styles.decorCircle2, { backgroundColor: `${konuRenk}20` }]}
        />
        <View
          style={[styles.decorCircle3, { backgroundColor: `${konuRenk}25` }]}
        />
      </View>
      <Text style={styles.title}>{konuBaslik}</Text>
      <Text style={styles.progressText}>
        {t("completedLessons", {
          completed: altKonular.filter((konu) => konu.tamamlandi).length,
          total: altKonular.length,
        })}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {altKonular.map((altKonu, index) => (
            <TouchableOpacity
              key={altKonu.id}
              style={[
                styles.altKonuCard,
                altKonu.tamamlandi && styles.tamamlandiCard,
              ]}
              onPress={() =>
                navigation.navigate("KonuDetay", {
                  konu: altKonu.baslik,
                  videoId: altKonu.videoId,
                  aciklama: altKonu.aciklama,
                  konuId: konuId,
                  altKonuId: altKonu.id,
                  tamamlandi: altKonu.tamamlandi,
                  onTamamla: handleKonuTamamla,
                  konuRenk: konuRenk,
                })
              }
            >
              <View style={styles.leftContent}>
                <View
                  style={[
                    styles.numberContainer,
                    { backgroundColor: `${konuRenk}15` },
                  ]}
                >
                  <Text style={[styles.numberText, { color: konuRenk }]}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.lineContainer}>
                  <View
                    style={[
                      styles.verticalLine,
                      { backgroundColor: `${konuRenk}15` },
                    ]}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.mainContent,
                  {
                    backgroundColor: `${konuRenk}10`,
                    borderColor: `${konuRenk}30`,
                  },
                ]}
              >
                <Text style={styles.altKonuTitle}>{altKonu.baslik}</Text>
                <View style={styles.playButton}>
                  {altKonu.tamamlandi ? (
                    <Icon name="check-circle" size={24} color="#34C759" />
                  ) : (
                    <Icon
                      name="play-circle-filled"
                      size={24}
                      color={konuRenk}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  headerBg: {
    position: "absolute",
    top: 0,
    left: -100,
    right: -100,
    height: 180,
    transform: [{ rotate: "-5deg" }],
  },
  headerContent: {
    position: "absolute",
    top: 0,
    left: -100,
    right: -100,
    height: 180,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 100,
    paddingHorizontal: 20,
    color: "#444",
  },
  progressText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 20,
    marginTop: 80,
  },
  altKonuCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  leftContent: {
    alignItems: "center",
    marginRight: 15,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  numberText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lineContainer: {
    flex: 1,
    alignItems: "center",
  },
  verticalLine: {
    width: 2,
    flex: 1,
  },
  mainContent: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  altKonuTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tamamlandiCard: {
    opacity: 0.8,
  },
  decorCircle1: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    right: -40,
    top: -30,
    opacity: 0.7,
  },
  decorCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    right: 30,
    top: 40,
    opacity: 0.5,
  },
  decorCircle3: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    left: -40,
    top: -40,
    opacity: 0.6,
  },
});

export default AltKonularScreen;

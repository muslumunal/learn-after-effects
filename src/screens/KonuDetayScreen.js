import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from "react-native-vector-icons/Ionicons";

const KonuDetayScreen = ({ route, navigation }) => {
  const {
    konu,
    videoId,
    aciklama,
    konuId,
    altKonuId,
    tamamlandi: initialTamamlandi,
    onTamamla,
    konuRenk,
  } = route.params;

  const [tamamlandi, setTamamlandi] = useState(initialTamamlandi);

  const handleTamamla = () => {
    setTamamlandi(true);
    onTamamla(konuId, altKonuId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

        {/* Geri butonu */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{konu}</Text>

        <View style={styles.videoContainer}>
          <View style={styles.videoWrapper}>
            <YoutubePlayer height={220} videoId={videoId} />
          </View>
        </View>

        <Text style={styles.aciklama}>{aciklama}</Text>

        <TouchableOpacity
          style={[
            styles.tamamlaButton,
            tamamlandi && styles.tamamlandiButton,
            { backgroundColor: `${konuRenk}15` },
          ]}
          onPress={handleTamamla}
          disabled={tamamlandi}
        >
          <View style={styles.buttonContent}>
            <Text
              style={[
                styles.buttonText,
                { color: "#444" },
                tamamlandi && { color: "#444" },
              ]}
            >
              {tamamlandi ? "Tamamlandı" : "Konuyu Tamamla"}
            </Text>
            {tamamlandi ? (
              <Icon name="checkmark-circle" size={24} color="#444" />
            ) : (
              <Icon name="arrow-forward-circle" size={24} color="#444" />
            )}
          </View>
        </TouchableOpacity>
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
    zIndex: 1,
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    position: "relative",
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#444",
  },
  videoContainer: {
    marginBottom: 20,
    position: "relative",
    zIndex: 2,
  },
  videoWrapper: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  aciklama: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    color: "#666",
  },
  tamamlaButton: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "transparent",
    width: "60%",
    alignSelf: "center",
  },
  tamamlandiButton: {
    // borderColor: "#34C75930",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default KonuDetayScreen;

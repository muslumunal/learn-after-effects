import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const KonuDetayScreen = ({ route, navigation }) => {
  const {
    konu,
    videoId,
    aciklama,
    konuId,
    altKonuId,
    tamamlandi: initialTamamlandi,
    onTamamla,
    konuBaslik,
    altKonular: initialAltKonular,
    konuRenk,
  } = route.params;

  const [tamamlandi, setTamamlandi] = useState(initialTamamlandi);

  const handleTamamla = () => {
    setTamamlandi(true);
    onTamamla(konuId, altKonuId);

    // Önce önceki ekranın parametrelerini güncelle
    navigation.setParams({
      konuGuncellendi: true,
      guncelKonuId: konuId,
      guncelAltKonuId: altKonuId,
    });

    // Sonra geri dön
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{konu}</Text>

      <View style={styles.videoContainer}>
        <YoutubePlayer height={220} videoId={videoId} />
      </View>

      <Text style={styles.aciklama}>
        {aciklama}
        {videoId}
      </Text>

      <TouchableOpacity
        style={[styles.tamamlaButton, tamamlandi && styles.tamamlandiButton]}
        onPress={handleTamamla}
        disabled={tamamlandi}
      >
        <Text style={styles.buttonText}>
          {tamamlandi ? "Tamamlandı" : "Konuyu Tamamla"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
  },
  aciklama: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  tamamlaButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  tamamlandiButton: {
    backgroundColor: "#34C759",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default KonuDetayScreen;

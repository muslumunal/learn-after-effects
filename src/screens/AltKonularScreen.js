import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AltKonularScreen = ({ route, navigation }) => {
  const { konuBaslik, altKonular, konuId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{konuBaslik}</Text>
      <ScrollView>
        {altKonular.map((altKonu) => (
          <TouchableOpacity
            key={altKonu.id}
            style={styles.altKonuCard}
            onPress={() =>
              navigation.navigate("KonuDetay", {
                konu: altKonu.baslik,
                videoId: altKonu.videoId,
                aciklama: altKonu.aciklama,
                konuId: konuId,
                altKonuId: altKonu.id,
              })
            }
          >
            <View style={styles.altKonuContent}>
              <Text style={styles.altKonuTitle}>{altKonu.baslik}</Text>
              <Icon name="chevron-right" size={24} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  altKonuCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  altKonuContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  altKonuTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
});

export default AltKonularScreen;

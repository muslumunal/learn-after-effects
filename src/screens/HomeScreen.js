import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Anasayfa</Text>
      <Button onPress={() => navigation.navigate("Kurslarım")}>
        Kurslarım
      </Button>
      <Button onPress={() => navigation.navigate("Kurs Bilgilerim")}>
        Kurs Bilgilerim
      </Button>
      <Button onPress={() => navigation.navigate("Sayac")}>Sayac</Button>
      <Button onPress={() => navigation.navigate("Kutu Uygulaması")}>
        Kutu Uygulaması
      </Button>
      <Button onPress={() => navigation.navigate("Kutu Uygulaması 2")}>
        Kutu Uygulaması 2
      </Button>
      <Button onPress={() => navigation.navigate("Şifre Ekranı")}>
        Şifre Ekranı
      </Button>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Derslerim")}
      >
        <Text style={styles.buttonText}>Derslerim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;

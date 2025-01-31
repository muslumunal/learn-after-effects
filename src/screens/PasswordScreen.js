import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  return (
    <View style={styles.main}>
      <Text style={styles.size}>Şifrenizi Giriniz: </Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
      ></TextInput>
      {password.length < 6 ? <Text>Şifre en az 6 karakter olmalı</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  size: {
    fontSize: 55,
  },
  main: {
    margin: 10,
    fontSize: 69,
  },
  input: {
    borderColor: "red",
    bordorWidth: 1,
    padding: 10,
  },
});

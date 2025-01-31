import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@react-navigation/elements";

export default function ColorChange({ color, onIncrease, onDecrease }) {
  return (
    <View>
      <Text>{color}</Text>
      <Button
        onPress={() => {
          onIncrease();
        }}
      >
        {color} Arttır
      </Button>
      <Button
        onPress={() => {
          onDecrease();
        }}
      >
        {color} Azalt
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

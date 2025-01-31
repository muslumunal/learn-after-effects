import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "@react-navigation/elements";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.payload };
    case "decrement":
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

export default function CounterScreen() {
  //const [counter, setCounter] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <View>
      <Button
        onPress={() => {
          //setCounter(counter + 1);
          dispatch({ type: "increment", payload: 1 });
        }}
      >
        Attır
      </Button>
      <Button
        onPress={() => {
          //setCounter(counter - 1);
          dispatch({ type: "decrement", payload: 1 });
        }}
      >
        Azalt
      </Button>
      <Text>Sayı: {state.count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

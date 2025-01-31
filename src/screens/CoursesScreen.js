import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

export default function CoursesScreen() {
  const courses = [
    { name: "angular", id: 1 },
    { name: "react", id: 2 },
    { name: "java", id: 3 },
    { name: "html", id: 4 },
    { name: "css", id: 5 },
  ];

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <Text style={styles.content}>{item.name}</Text>;
      }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize: 20,
    backgroundColor: "yellow",
    marginVertical: 10,
    padding: 20,
  },
});

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Information from "../../components/Information";

export default function CoursesInformation() {
  return (
    <ScrollView>
      <Information
        title="Angular Eğitimi"
        imageSource={require("../../assets/1.jpg")}
        desc="Kapsamlı Angular Eğitimi"
      ></Information>
      <Information
        title="Java Eğitimi"
        imageSource={require("../../assets/2.png")}
        desc="Kapsamlı Java Eğitimi"
      ></Information>
      <Information
        title="Html Eğitimi"
        imageSource={require("../../assets/3.png")}
        desc="Kapsamlı Html Eğitimi"
      ></Information>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

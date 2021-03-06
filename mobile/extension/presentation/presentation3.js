import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

const presentation3 = (props) => {
  return (
    <View style={styles.presentationContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../assets/screen3.png")} />
      </View>
      <Text style={{textAlign: 'center'}}>Fill the survey, first for tree characteristics, then for lichen cover.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  presentationContainer: {
    width: Dimensions.get("window").width * 0.9,
    paddingHorizontal: Dimensions.get("window").width * 0.12,
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.850,
    height: Dimensions.get("window").width * 0.92,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  }
})
export default presentation3;

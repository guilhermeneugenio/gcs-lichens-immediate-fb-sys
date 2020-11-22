import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

const presentation2 = (props) => {
  return (
  <View style={styles.presentationContainer}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={require("../../assets/screen2.png")} />
    </View>
    <Text style={{textAlign: 'center'}}>You analysis area is an area in the trunk facing north, with an area of an A4 paper size, at about 1.5m from the ground.</Text>
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
    width: Dimensions.get("window").width * 0.800,
    height: Dimensions.get("window").width * 0.92,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  }
})

export default presentation2;

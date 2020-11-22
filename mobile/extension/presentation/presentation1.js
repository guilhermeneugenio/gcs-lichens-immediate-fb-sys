import React from "react";
import { View, Text, Dimensions, Image, StyleSheet } from "react-native";

const presentation1 = (props) => {
  return (
    <View style={styles.presentationContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../assets/screen1.png")} />
      </View>
      <Text style={{textAlign: 'center'}}>Find a tree with lichens, fill one survey per tree. The trunk must be straight, and without branches up to 2m high!</Text>
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
export default presentation1;

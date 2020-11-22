import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

const presentation5 = (props) => {
  return (
    <View style={styles.presentationContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../../assets/screen5.png")} />
      </View>
      <Text style={{textAlign: 'center'}}>The results will present a map with 3 important metrics: aridity, poleotolerance and eutrophication.</Text>
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

export default presentation5;

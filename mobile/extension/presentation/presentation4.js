import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

const presentation4 = (props) => {
    return (
    <View style={styles.presentationContainer}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../../assets/screen4.png")} />
        </View>
        <Text style={{textAlign: 'center'}}>For the species you can identify estimate the cover percentages of each lichen species.</Text>
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

export default presentation4;

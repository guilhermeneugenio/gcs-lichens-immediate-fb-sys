import React from "react";
import { View, Text, Dimensions } from "react-native";

const presentation3 = (props) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        alignItems: "center",
      }}
    >
      <Text>Check the Results!</Text>
    </View>
  );
};

export default presentation3;

import React from "react";
import { View, Text, Dimensions } from "react-native";

const presentation2 = (props) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        alignItems: "center",
      }}
    >
      <Text>Insert it on Survey Mode!</Text>
    </View>
  );
};

export default presentation2;

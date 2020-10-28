import React from "react";
import { View, Text, Dimensions } from "react-native";

const presentation1 = (props) => {
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        alignItems: "center",
      }}
    >
      <Text>Find a Lichen!</Text>
    </View>
  );
};

export default presentation1;

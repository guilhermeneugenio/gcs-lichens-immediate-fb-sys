// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Slider,
  StyleSheet,
  Dimensions,
  Text,
  Image
} from "react-native";
import LichensImagePickerStylesheet from './LichensImagePickerStylesheet';

// Image Picker by  user built with react native TouchableOpacity and Image component
const TrunkSlider = props => {

  const [value, setValue] = useState(0);

  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
     
    props.onChange(props.pageIndex, props.index, '');
    
  }, []);


  const sliderHandler = enteredValue => {
    setValue(Math.ceil(enteredValue / 10) * 10)
    props.onChange(props.pageIndex, props.index, Math.ceil(enteredValue / 10) * 10);
    if (enteredValue === 0) props.onChange(props.pageIndex, props.index, '');
  }
  
  return (
      <View style={styles.container}>
          <Text style={styles.title}>{props.props.name}</Text>
        <Image style={LichensImagePickerStylesheet.imagebig} source={{ uri: props.props.link}}/>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Slider
                style={LichensImagePickerStylesheet.slider}
                minimumValue={props.props.min}
                maximumValue={props.props.max}
                step={0.5}
                thumbTintColor={"grey"}
                animateTransitions={true}
                minimumTrackTintColor={"darkolivegreen"}
                onValueChange={sliderHandler}/>
            <Text style={{fontWeight: "bold", textAlign: "center"}} >{value} cm</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      paddingBottom: Dimensions.get('window').height * 0.02
    },   
    title: {
      fontSize: 18,
      marginBottom: Dimensions.get('window').height * 0.02,
      fontWeight: 'bold'
    },
});
export default TrunkSlider;
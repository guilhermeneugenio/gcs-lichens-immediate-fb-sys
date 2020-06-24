// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Alert
} from "react-native";

// Image Picker by  user built with react native TouchableOpacity and Image component
const LichensImagePicker = props => {

  // Variable used to update option's state
  let auxOptions = [];
  // State that stores the state of each option
  const [options, setOptions] = useState([]);
  // Dummy state used to force render
  const [dummyState, setDummyState] = useState(false);


  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
    for (var i = 0; i < props.props.choices.length; i++)
      auxOptions[i] = 0;
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, []);
    // Update options state
    setOptions(auxOptions);
    
  }, []);

  // Called everytime an image is pressed 
  const onChange = index => {
   Alert.alert(
        props.props.choices[index].value,
        'Define the abundance.',
        [
          {
            text: '25%',
            onPress: () => abundance(0.25, index)
          },
          {
            text: '50%',
            onPress: () => abundance(0.50, index)
          },
          {
            text: '75%',
            onPress: () => abundance(0.75, index)
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
        ],
        { cancelable: false }
    );
  };

  const abundance= (value, index) => {
    // Array to save as answer data
    var data = [];
    // Fetch options from the state
    auxOptions = options;
    // Change pressed option
    auxOptions[index] = value;
 
    // Adds true options (checked) to the answer array
    auxOptions.map((option, index) => {
        if (option) data.push([props.props.choices[index].value, auxOptions[index]]);
      });

    // Saves new state
    setOptions(auxOptions);
    // Sends answer data to the form component (parent)
    props.onChange(props.pageIndex, props.index, data);
    // Forces render
    setDummyState(!dummyState);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.props.name}</Text>
      <View style={styles.content} >
        {props.props.choices.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity onPress={onChange.bind(this, index)}>
                <Image style={options[index] ? 
                  {...styles.imageSelect, 
                    width: ((Dimensions.get('window').width*0.94-props.props.margin*props.props.imagesPerLine*2)/props.props.imagesPerLine) || (Dimensions.get('window').width*0.15),
                    height: ((Dimensions.get('window').width*0.94-props.props.margin*props.props.imagesPerLine*2)/props.props.imagesPerLine) || (Dimensions.get('window').width*0.15),
                    margin: props.props.margin || Dimensions.get('window').width*0.01 } 
                  :{width: ((Dimensions.get('window').width*0.94-props.props.margin*props.props.imagesPerLine*2)/props.props.imagesPerLine) || (Dimensions.get('window').width*0.15),
                    height: ((Dimensions.get('window').width*0.94-props.props.margin*props.props.imagesPerLine*2)/props.props.imagesPerLine) || (Dimensions.get('window').width*0.15),
                    margin:  props.props.margin || Dimensions.get('window').width*0.01  }} 
                  source={{ uri: item.imageLink }} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  container: {
    paddingBottom: Dimensions.get('window').height * 0.02
  },
  title: {
    fontSize: 18,
    marginBottom: Dimensions.get('window').height * 0.02
  },
  imageSelect: {
    borderColor: 'yellowgreen',
    borderWidth: 3,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  }
});

export default LichensImagePicker;
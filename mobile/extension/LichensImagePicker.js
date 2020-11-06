// Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  Modal,
  Slider,
  TouchableHighlight,
} from "react-native";
import LichensImagePickerStylesheet from './LichensImagePickerStylesheet';

// Image Picker by  user built with react native TouchableOpacity and Image component
const LichensImagePicker = props => {

  // Variable used to update option's state
  let auxOptions = [];
  // State that stores the state of each option
  const [options, setOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lichenID, setLichenID] = useState(0);
  const [value, setValue] = useState(0);

  a =4 
  console.log(a)
  // Initially sets all options to false and sends an empty array as answer data
  useEffect(() => {
    for (var i = 0; i < props.props.choices.length; i++)
      auxOptions[i] = 0;
    // Send data through the onChange prop
    props.onChange(props.pageIndex, props.index, '');
    // Update options state
    setOptions(auxOptions);
    
  }, []);

  const abundanceInfo=() => {
    let info = [0,[]];
    let aux = [];
    options.map( (option, index)=>{
      if(option && index!=lichenID){
        info[0]+=option;
        aux.push(index)
      }})
    info[1]= aux;
    return(info)
  }
  const abundanceAnalyzer=() => {
    auxOptions = options;
    let info = abundanceInfo();
    var dif = info[0]+value;
    let newValueUpdater = 0;
    if(dif > 100){
      dif -= 100;
      let sum = 0;
      let modList = [];
      
      info[1].map(index => {
        var abundance = auxOptions[index]/info[0]*dif;
        var modulus = abundance % 5;
        var abundanceNorm = 0;

        if(modulus > 2.5) var abundanceNorm = Math.ceil(abundance/5)*5
        else var abundanceNorm = Math.floor(abundance/5)*5

        if(auxOptions[index] == abundanceNorm){
          auxOptions[index] = 5
          newValueUpdater += 5
        }
        else auxOptions[index]-= abundanceNorm;
        
        sum += abundanceNorm; 

        if (auxOptions[index]>5) modList.push({mod: modulus, ind: index})
      }) 

      modList.sort((a, b) => a.mod > b.mod ? -1 : 1)

      let i = 0;
      while(sum!=dif){
        if(modList[i]){
          var sign = 1;
          if(sum-dif < 0) sign = -1;
          auxOptions[modList[i].ind]+=5*sign;
          sum -=5*sign;
        }
        else break;
        if(auxOptions[modList[i].ind]==5) i++;
      }
    }

    auxOptions[lichenID] = value - newValueUpdater
    setOptions(auxOptions);
  }
  const abundance=() => {
    // Array to save as answer data
    var data = [];

    abundanceAnalyzer();

    auxOptions.map((option, index) => {
        if (option) data.push([props.props.choices[index].value, options[index]]);
      });
 
    // Sends answer data to the form component (parent)
    props.onChange(props.pageIndex, props.index, data);
    // Forces render
    setValue(0)
    setModalVisible(!modalVisible);
    
  }

  // Called everytime an image is pressed 
  const onChange = value => {
    
    setLichenID(value);
    setModalVisible(!modalVisible);    
  };

  const sliderHandler= enteredValue => {setValue(Math.ceil(enteredValue/5)*5)}

  let content = (index) => {
    if(options[index]!= 0) return(
        <View style={[LichensImagePickerStylesheet.image, LichensImagePickerStylesheet.imageSelect]}>
          <Text style={LichensImagePickerStylesheet.textSelect}>{options[index]}%</Text>     
        </View>);
    else {
      return( <View></View> );
    }    
  }
  
  return (
    <View style={{marginBottom: Dimensions.get('window').height*0.08}}>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={LichensImagePickerStylesheet.centeredView}>
          <View style={LichensImagePickerStylesheet.modalView}>
            <Text style={LichensImagePickerStylesheet.modaltext}>{props.props.choices[lichenID].value}</Text>
            <Image style={LichensImagePickerStylesheet.imagebig} source={{ uri: props.props.choices[lichenID].imageLink }}/>
            <Slider
              style={LichensImagePickerStylesheet.slider}
              minimumValue={0}
              maximumValue={100}
              step={0.5}
              thumbTintColor={"grey"}
              animateTransitions={true}
              minimumTrackTintColor={"darkolivegreen"}
              onValueChange={sliderHandler}/>
            <View style={LichensImagePickerStylesheet.wrapModalButtons}>
              <TouchableHighlight
              style={{ ...LichensImagePickerStylesheet.openButton, backgroundColor: "#b32b2b" }}
              onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={LichensImagePickerStylesheet.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
              style={{ ...LichensImagePickerStylesheet.openButton, backgroundColor: "#50931a" }}
              onPress={() => abundance()}>
                <Text style={LichensImagePickerStylesheet.textStyle}>Submit</Text>
              </TouchableHighlight>
              <Text style={{width: Dimensions.get('window').width * 0.1}}>{value}%</Text>
            </View>
          </View>
        </View>
      </Modal>
      <View style={LichensImagePickerStylesheet.content} >
      {props.props.choices.map((item, index) => {
        return (
          <View key={index}>
            <TouchableHighlight onPress={onChange.bind(this, index)} underlayColor='transparent'>
              <View>
                <Image style={LichensImagePickerStylesheet.image} source={{ uri: item.imageLink }}/>
                {content(index)}
              </View>
            </TouchableHighlight>
          </View>
        );
        })}
      </View>
    </View>
  );
};

export default LichensImagePicker;
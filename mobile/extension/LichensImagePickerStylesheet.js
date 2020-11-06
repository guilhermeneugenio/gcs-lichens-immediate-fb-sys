import { StyleSheet, Dimensions } from "react-native";
import globalStyles from "../constants/globalStyles";
import Colors from "../constants/colors";

// Style
const LichensImagePickerStylesheet = StyleSheet.create({
    title: {
      fontSize: 18,
      marginBottom: Dimensions.get('window').height * 0.02
    },
    image: {
      width: Dimensions.get('window').width*0.30,
      height: Dimensions.get('window').width*0.30,
      margin: Dimensions.get('window').width*0.005
    },
    imagebig: {
      width: Dimensions.get('window').width*0.80,
      height: Dimensions.get('window').width*0.50,
      margin: Dimensions.get('window').width*0.005,    
      borderRadius: 20
    },
    imageSelect: {
      backgroundColor: 'rgba(17,140,17,0.5)',
      position: "absolute",
      justifyContent: 'center',
    },
    textSelect: {
      color: "white",
      textAlign: "center",
      fontSize: Dimensions.get('window').width * 0.05 ,
      opacity: 1
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modaltext: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: Dimensions.get('window').height * 0.02,
    },
  slider: {
      width: Dimensions.get('window').width * 0.7,
      margin: Dimensions.get('window').height * 0.02,
    },
    openButton: {
      borderRadius: 10,
      padding: 10,
    },
    wrapModalButtons:{ 
      flexDirection: "row",
      justifyContent:'space-between', 
      alignItems:'center', 
      width: Dimensions.get('window').width * 0.7
    },
    content: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    centeredView: {
      flex: Dimensions.get('window').height * 2,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      ...globalStyles.shadow,
      shadowColor:'#5c5c5c',
      paddingVertical:Dimensions.get('window').height * 0.025,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
    }
  });
  
  export default LichensImagePickerStylesheet;
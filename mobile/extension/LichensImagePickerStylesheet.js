import { StyleSheet, Dimensions } from "react-native";
import globalStyles from "../constants/globalStyles";

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
    slider:{
      width: Dimensions.get('window').width * 0.7,
      margin: Dimensions.get('window').height * 0.02
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
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      ...globalStyles.shadow,
      paddingVertical:Dimensions.get('window').height * 0.03,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
    }
  });
  
  export default LichensImagePickerStylesheet;
import { StyleSheet, Dimensions } from "react-native";

// Style
const LichensImagePickerStylesheet = StyleSheet.create({
    container: {
      paddingBottom: Dimensions.get('window').height * 0.02
    },
    title: {
      fontSize: 18,
      marginBottom: Dimensions.get('window').height * 0.02
    },
    imageSelect: {
      backgroundColor: 'rgba(17,140,17,0.5)',
      position: "absolute",
      justifyContent: 'center'
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
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      
    },
    content: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 18,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  });
  
  export default LichensImagePickerStylesheet;
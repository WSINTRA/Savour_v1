import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const offWhite = "#fffbf7"
const dimOrange = "#c7681a"
export const formStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: 0,
      backgroundColor: offWhite
    },
    heading:{
      textAlign: "center",
      letterSpacing: 3,
      fontSize:22
    },
    input:{
      marginLeft:22,
      marginRight: 22,
      padding: 3,
      height:30,
      fontSize:18,
      borderStyle: 'solid',
      borderTopColor: offWhite,
      borderRightColor: offWhite,
      borderLeftColor: offWhite,
      borderWidth: 2,
    },
    imageBound: {
      width: windowWidth,
      height: windowHeight - 60,
      justifyContent: "center",
      backgroundColor: "powderblue",
    },
    buttonBound: {
      flex: 1,
      flexDirection: "row",
    },
    formBound:{
      flex: 1,
      flexDirection: "column",
      justifyContent: 'flex-end',
    },
    login:{
      // backgroundColor: '#FDD7E4',
      // alignSelf: 'stretch',
      textAlign: 'center',
      paddingTop:20,
      height:60,
      textTransform:'uppercase',
      fontFamily:'Avenir',
      fontWeight: 'bold',
    },
    //These 2 buttons are identical apart from bg color, TODO: Make into one css style 
    loginButton: {
      width: windowWidth / 2,
      height: 80,
      backgroundColor: "#faf6f2",
      textAlign: "center",
      paddingTop:15,
      fontSize: 16,
      fontFamily:'Avenir',
      textTransform:'uppercase',
      fontWeight: 'bold',
      letterSpacing: 3
    },
    signUpButton: {
      width: windowWidth / 2,
      height: 60,
      backgroundColor: dimOrange,
      color: '#1c1c1c',
      textAlign: "center",
      paddingTop:15,
      fontSize: 16,
      fontFamily:'Avenir',
      textTransform:'uppercase',
      fontWeight: 'bold',
      letterSpacing: 3
  
    },
  });
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {offWhite, dimOrange} from '../colors'
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const formStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: 0,
      backgroundColor: offWhite
    },
    disclaimer:{
      textAlign: "center",
      paddingTop:100,
      letterSpacing: 3,
    },
    disclaimerButton:{
      color: dimOrange,
      marginTop: 50,
      paddingTop: 10,
      borderStyle: 'solid',
      borderColor: dimOrange,
      borderWidth: 2,
      backgroundColor: offWhite,
      alignItems: "center",
      letterSpacing: 3,
      width: 110,
      height: 40,
      textAlign: "center",
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
      flexDirection: "row",
      justifyContent: "space-around"
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
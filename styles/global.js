import { StyleSheet, Dimensions } from "react-native";
import { offWhite, dimOrange, buttonGrey, borderGrey, buttonBlack, backgroundWhite } from "../colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const currentBeerStyle = StyleSheet.create({
  scrollContainer: {
    backgroundColor: offWhite,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardDetails: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
  },
  floatingShare: {
    position: "absolute",
    right: 30,
    top: -20,
    backgroundColor: dimOrange,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardButton: {
    backgroundColor: dimOrange,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    width: windowWidth,
    height: 50,
    textAlign: "center",
    flexDirection: "row",
    margin: "auto",
  },
  cardButtonText: {
    letterSpacing: 3,
    fontWeight: "bold",
  },
  cardImage: {
    width: 400,
    height: 350,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoTitle: {
    paddingTop: 30,
    textTransform: "uppercase",
    color: buttonGrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSubtitle: {
    paddingTop: 10,
    textTransform: "uppercase",
    color: buttonGrey,
    fontSize: 16,
  },
  infoDescription: {
    paddingTop: 10,
    color: buttonGrey,
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.8)",
    width: windowWidth,
    height: 12,
    bottom: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});


export const drawerStyles = StyleSheet.create({
  label:  {
    textTransform: "uppercase",
    letterSpacing: 3,
    fontSize: 12,
    marginTop:-10,
    marginBottom:-10,
  },
})
export const mainStyles = StyleSheet.create({
  mainTitle: {
    marginTop: 10,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 2,
    borderTopColor: offWhite,
    borderRightColor: offWhite,
    borderLeftColor: offWhite,
    
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 60,
    width: windowWidth,
    backgroundColor: offWhite,
  },
})

export const registerStyle = StyleSheet.create({
  header: {
    textAlign: "center",
    marginTop: 10,
  },
  row1:{
    flexDirection:"row",
    marginTop: 30,
    justifyContent: "space-around"
   },
   nameInput:{
    width: (windowWidth/2- 40),
    borderStyle: "solid",
    borderBottomColor: borderGrey,
    borderTopColor: offWhite,
    borderRightColor: offWhite,
    borderLeftColor: offWhite,
    borderWidth: 1,
    paddingBottom: 10,
    fontSize: 18,
   },
   input: {
    width: (windowWidth -60),
    paddingBottom: 20,
    fontSize: 18,
    borderStyle: "solid",
    borderBottomColor: borderGrey,
    borderTopColor: offWhite,
    borderRightColor: offWhite,
    borderLeftColor: offWhite,
    borderWidth: 1,
   },
  row2:{
    marginTop:50,
    marginLeft: 25,
    marginRight: 25,
    flexDirection:"row",
    justifyContent: "flex-start"
  },
})
export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
    backgroundColor: offWhite,
  },
  disclaimer: {
    textAlign: "center",
    paddingTop: 100,
    letterSpacing: 3,
  },
  zipForm: {
    textAlign: "center",
    paddingTop: 100,
    letterSpacing: 1,
  },
  disclaimerButton: {
    color: dimOrange,
    marginTop: 50,
    paddingTop: 10,
    borderStyle: "solid",
    borderColor: dimOrange,
    borderWidth: 2,
    backgroundColor: offWhite,
    alignItems: "center",
    letterSpacing: 3,
    width: 110,
    height: 40,
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    letterSpacing: 3,
    fontSize: 22,
  },
  input: {
    marginLeft: 22,
    marginRight: 22,
    padding: 3,
    height: 30,
    fontSize: 18,
    borderStyle: "solid",
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
    justifyContent: "space-around",
  },
  formBound: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  login: {
    // backgroundColor: '#FDD7E4',
    // alignSelf: 'stretch',
    textAlign: "center",
    paddingTop: 20,
    height: 60,
    textTransform: "uppercase",
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
  //These 2 buttons are identical apart from bg color, TODO: Make into one css style
  loginButton: {
    width: windowWidth / 2,
    height: 80,
    backgroundColor: backgroundWhite,
    textAlign: "center",
    paddingTop: 15,
    fontSize: 16,
    fontFamily: "Avenir",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 3,
  },
  signUpButton: {
    width: windowWidth / 2,
    height: 60,
    backgroundColor: dimOrange,
    color: "#1c1c1c",
    textAlign: "center",
    paddingTop: 15,
    fontSize: 16,
    fontFamily: "Avenir",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 3,
  },
});

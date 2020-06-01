import React from "react";
import { formStyles } from "../styles/global";
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
} from "react-native";
import savourBG from "../assets/savourBG.png";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={savourBG}
        style={formStyles.imageBound}
      ></ImageBackground>
      <View style={formStyles.buttonBound}>
        <TouchableHighlight
        onPress={() =>
          navigation.navigate('RegisterForm', { name: 'RegisterForm' })
        }>
          <Text style={[formStyles.signUpButton, { color: "whitesmoke" }]}>
            SIGN UP
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
        onPress={() =>
          navigation.navigate('LoginForm', { name: 'LoginForm' })
        }>
          <Text style={formStyles.loginButton}>LOGIN</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Welcome;

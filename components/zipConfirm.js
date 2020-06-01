import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formStyles } from "../styles/global";
import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import { offWhite, dimOrange } from "../colors";

function zipConfirm() {
  const [lineStyle, setlineStyle] = useState({
    borderBottomColor: offWhite,
  });
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={formStyles.container}
      >
        <TouchableHighlight
          onPress={() =>
            navigation.navigate("Disclaimer", { name: "Disclaimer" })
          }
        >
          <Text
            style={{
              fontSize: 40,
              paddingTop: 20,
              paddingLeft: 10,
              transform: [{ scaleY: 2 }],
            }}
          >
            &#60;
          </Text>
        </TouchableHighlight>
        <Text style={[formStyles.zipForm, {fontSize:15}]}>WHAT'S YOUR ZIP CODE?</Text>
        <Text style={{ fontSize: 10, textAlign: 'center' }}>
          We'll get you the beers you can't get in your area
        </Text>
        <TextInput
          style={[formStyles.input, lineStyle, {textAlign:'center',marginTop:40}]}
          name="zip"
          type="text"
          placeholder="Zip Code"
          autoFocus={true}
          onFocus={() => setlineStyle({ borderBottomColor: dimOrange })}
          onEndEditing={() => setlineStyle({ borderBottomColor: offWhite })}
        />
      </KeyboardAvoidingView>
    </>
  );
}
export default zipConfirm;

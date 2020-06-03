import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { formStyles } from "../styles/global";
import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { offWhite, dimOrange } from "../colors";

function zipConfirm(props) {
  const { zipCode, buttonStyle, changeInputText, changeButtonStyle } = props;
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
        onPress={() => navigation.goBack()}
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
        <Text style={[formStyles.zipForm, { fontSize: 15 }]}>
          WHAT'S YOUR ZIP CODE?
        </Text>
        <Text style={{ fontSize: 10, textAlign: "center" }}>
          We'll get you the beers you can't get in your area
        </Text>
        <TextInput
          keyboardType={"numeric"}
          style={[
            formStyles.input,
            lineStyle,
            { textAlign: "center", marginTop: 40 },
          ]}
          value={zipCode}
          name="zip"
          type="text"
          placeholder="Zip Code"
          onChangeText={(e) => changeInputText("zipCode", e)}
          autoFocus={true}
          onFocus={() => setlineStyle({ borderBottomColor: dimOrange })}
          onEndEditing={() => setlineStyle({ borderBottomColor: offWhite })}
        />
        <View style={formStyles.formBound}>
          <Text style={[buttonStyle, formStyles.login]}
          onPress={()=> {changeButtonStyle();navigation.push("CreateAccnt")}  } >CONTINUE</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
export default zipConfirm;

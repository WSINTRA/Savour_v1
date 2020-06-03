import React, { useState } from "react";
import { registerStyle, formStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { offWhite, dimOrange, borderGrey } from "../colors";

function CreateAccnt(props) {
  const navigation = useNavigation();
  const {
    buttonStyle,
    changeInputText,
    firstName,
    lastName,
    email,
    password,
    confirmPass,
    promoCode,
  } = props;
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={formStyles.container}
      >
        <ScrollView>
          <TouchableHighlight onPress={() => navigation.goBack()}>
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
          <Text style={[registerStyle.header, { fontSize: 15 }]}>
            CREATE YOUR ACCOUNT
          </Text>
          <View style={registerStyle.row1}>
            <TextInput
              style={registerStyle.nameInput}
              value={firstName}
              name="firstName"
              onChangeText={(e) => changeInputText("firstName", e)}
              type="text"
              placeholder="First Name"
              autoFocus={true}
            />
            <TextInput
              style={registerStyle.nameInput}
              value={lastName}
              name="lastName"
              onChangeText={(e) => changeInputText("lastName", e)}
              type="text"
              placeholder="Last Name"
              autoFocus={false}
            />
          </View>
          <View style={registerStyle.row2}>
            <TextInput
              style={registerStyle.input}
              value={email}
              name="email"
              onChangeText={(e) => changeInputText("email", e)}
              type="text"
              placeholder="Email Address"
            />
          </View>
          <View style={registerStyle.row2}>
            <TextInput
              style={registerStyle.input}
              value={password}
              name="password"
              onChangeText={(e) => changeInputText("password", e)}
              type="password"
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
          <View style={registerStyle.row2}>
            <TextInput
              style={registerStyle.input}
              value={confirmPass}
              name="confirmPass"
              onChangeText={(e) => changeInputText("confirmPass", e)}
              type="password"
              secureTextEntry={true}
              placeholder="Confirm Password"
            />
          </View>
          <View style={registerStyle.row2}>
            <TextInput
              style={registerStyle.input}
              value={promoCode}
              name="promoCode"
              onChangeText={(e) => changeInputText("promoCode", e)}
              type="text"
              placeholder="Promo or Referal Code (Optional)"
            />
          </View>
          <View>
            <Text style={[registerStyle.header, { fontSize: 15 }]}>
              Already have an account?{" "}
              <Text
                style={{ color: dimOrange }}
                onPress={() => navigation.navigate("Welcome")}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
        <View style={formStyles.formBound}>
          <Text style={[buttonStyle, formStyles.login]}>CONTINUE</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
export default CreateAccnt;

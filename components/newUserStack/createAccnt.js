import React, { useState } from "react";
import { registerStyle, formStyles } from "../../styles/global";
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
import { offWhite, dimOrange, borderGrey } from "../../colors";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName:String!, $zipCode: String!) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName, zipCode: $zipCode) {
      token
      user{
        firstName
      },
    }
  }
`;

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
    checkForReadyButton,
    zipCode,
    _confirm
  } = props;
//Create better validations than just checking for length, use regex for characters and create safe password validations 
// password will be check again later when submitting to the backend to ensure they are both equal
//TODO : Perform a quick vvalidation when the continue button is pressed
  const validations=()=>{
    // console.log("Checks in place: \n", 
    // "First name length",firstName.length,
    // "Last name length", lastName.length,
    // "Email length", email.length,
    // "Password length", password.length,
    // "Confirm pass length", confirmPass.length,
    // confirmPass, password)
    if(firstName.length > 2 && 
      lastName.length > 2 &&
      email.length > 2 &&
      password.length > 2 &&
      confirmPass.length > 2 &&
      password.length > 2){
        return true
    }
    return false
  }
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
              onChangeText={(e) => {changeInputText("confirmPass", e); checkForReadyButton(validations())}}
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
        <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{ email, password, firstName, lastName, zipCode }}
        onCompleted={(data) => _confirm(data)}
      >
        {(mutation) => (
          <View style={formStyles.formBound}>
            <Text onPress={mutation} style={[buttonStyle, formStyles.login]}>
              CONTINUE
            </Text>
          </View>
        )}
      </Mutation>
      </KeyboardAvoidingView>
    </>
  );
}
export default CreateAccnt;

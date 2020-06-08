import * as React from "react";
import { formStyles } from "../../styles/global";
import {
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import gql from "graphql-tag";

//Saving this for register form page
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

function Disclaimer({ navigation }) {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={formStyles.container}
      >
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
        <Text style={formStyles.disclaimer}>ARE YOU 21?</Text>
        <View style={formStyles.buttonBound}>
          <Text
            style={formStyles.disclaimerButton}
            onPress={() => navigation.goBack()}
          >
            NO
          </Text>
          <Text
            style={formStyles.disclaimerButton}
            onPress={() =>
              navigation.push("ZipConfirm")
            }
          >
            YES
          </Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
export default Disclaimer;

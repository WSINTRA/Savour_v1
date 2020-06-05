import React, { useState, useEffect } from "react";
import { formStyles } from "../styles/global";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  
} from "react-native";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useNavigation } from "@react-navigation/native";

import { offWhite, dimOrange } from '../colors';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
        firstName
      }
    }
  }
`;

const LoginForm = (props) => {
  const [emailLineStyle, setEmailLineStyle] = useState({
    borderBottomColor: offWhite
  });
  const [passLineStyle, setPassLineStyle] = useState({
    borderBottomColor: offWhite
  });
  const navigation = useNavigation();
  const { buttonStyle, email, changeInputText, password, _confirm, checkForReadyButton } = props;
  
  const validations =()=>{
    if(password.length > 2 && email.length > 2){
      return true
    }
    return false
  }

  return (
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

      <Text style={formStyles.heading}>LOG IN</Text>
      <Text>
        {"\n"}
        {"\n"}
      </Text>
      <TextInput
        style={[formStyles.input, emailLineStyle]}
        value={email}
        name="email"
        onChangeText={(e) => changeInputText("email", e)}
        type="text"
        placeholder="Email Address"
        autoFocus={true}
        onFocus={()=> setEmailLineStyle({ borderBottomColor: dimOrange})}
        onEndEditing={()=> setEmailLineStyle({borderBottomColor: offWhite})}
      />
      
      <Text>
        {"\n"}
        {"\n"}
      </Text>
      <TextInput
        style={[formStyles.input, passLineStyle]}
        value={password}
        onChangeText={(e) => {changeInputText("password", e); checkForReadyButton(validations())}}
        type="password"
        name="password"
        secureTextEntry={true}
        placeholder="Password"
        onFocus={() => setPassLineStyle({ borderBottomColor: dimOrange })}
        onEndEditing={()=> setPassLineStyle({ borderBottomColor: offWhite})}
      />
      <Text style={[formStyles.heading, { fontSize: 16, color: "#c7681a" }]}>
        {"\n"}
        {"\n"}Forgot password?
      </Text>
      {validations() ? <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ email, password}}
        onCompleted={(data) => _confirm(data)}
      >
        {(mutation) => (
          <View style={formStyles.formBound}>
            <Text onPress={mutation} style={[buttonStyle, formStyles.login]}>
              Login
            </Text>
          </View>
        )}
      </Mutation> :
      <View style={formStyles.formBound}>
      <Text style={[buttonStyle, formStyles.login]}>
        Login
      </Text>
    </View>
       }
      
    </KeyboardAvoidingView>
  );
};
export default LoginForm;

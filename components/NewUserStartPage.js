import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Disclaimer,
    LoginForm,
    Welcome,
    ZipConfirm,
    CreateAccnt,
  } from "../comps";

const NewUserStartPage = (props) =>{
  const Stack = createStackNavigator();
  const {
    zipCode,
    firstName,
    lastName,
    email,
    password,
    buttonStyle,
    confirmPass,
    promoCode,
    LoginFormFunctions,
    RegisterFormFunctions
  } = props;
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Disclaimer"
          component={Disclaimer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ZipConfirm" options={{ headerShown: false }}>
          {(props) => (
            <ZipConfirm
              buttonStyle={buttonStyle}
              zipCode={zipCode}
              checkForReadyButton={
                RegisterFormFunctions.checkForReadyButton
              }
              changeButtonStyle={RegisterFormFunctions.changeButtonStyle}
              changeInputText={RegisterFormFunctions.changeTextInput}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateAccnt" options={{ headerShown: false }}>
          {(props) => (
            <CreateAccnt
              buttonStyle={buttonStyle}
              firstName={firstName}
              lastName={lastName}
              email={email}
              password={password}
              confirmPass={confirmPass}
              promoCode={promoCode}
              zipCode={zipCode}
              checkForReadyButton={
                RegisterFormFunctions.checkForReadyButton
              }
              changeInputText={RegisterFormFunctions.changeTextInput}
              _confirm={RegisterFormFunctions._confirm}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="LoginForm" options={{ headerShown: false }}>
          {(props) => (
            <LoginForm
              buttonStyle={buttonStyle}
              email={email}
              changeInputText={LoginFormFunctions.changeTextInput}
              password={password}
              _confirm={LoginFormFunctions._confirm}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
export default NewUserStartPage;
import "react-native-gesture-handler";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
/**
 * When Creating new components or adding them to the App,
 *  - First: Import them into components.js
 *  - Then: add them to the import statement below
 */
import { Disclaimer, LoginForm, Welcome, ZipConfirm } from "./components";
//Wraps the app so that a navigation object can be used for screen navigations
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { View, Text } from "react-native";
import Icofont from 'react-icofont';

// import gql from "graphql-tag";
import AsyncStorage from "@react-native-community/async-storage";
import { dimOrange, buttonGrey, buttonBlack, buttonTextGrey } from "./colors";

//This stack is used in the NavigationContainers
const Stack = createStackNavigator();

//Apollo created as a nameSpace for all functionality of Apollo
const Apollo = {
  httpLink: createHttpLink({
    uri: "http://192.168.0.12:4000",
  }),

  getData: async (AUTH_TOKEN) => {
    try {
      const value = await AsyncStorage.getItem(AUTH_TOKEN);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  },

  authLink: setContext((_, { headers }) => {
    const token = Apollo.getData(AUTH_TOKEN).then((token) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ``,
        },
      };
    });
  }),
};
//this client is passed into the Apollo App wrapper
const client = new ApolloClient({
  link: Apollo.authLink.concat(Apollo.httpLink),
  cache: new InMemoryCache(),
});

//Saving this for register form page
// const SIGNUP_MUTATION = gql`
//   mutation SignupMutation($email: String!, $password: String!, $name: String!) {
//     signup(email: $email, password: $password, name: $name) {
//       token
//     }
//   }
// `;

class App extends React.Component {
  // componentDidMount() {
  //   try {
  //     token = Apollo.getData(AUTH_TOKEN).then((data) =>
  //       console.log("value is", data)
  //     );
  //   } catch {
  //     console.log("no token found");
  //   }
  //   //ToDO - Work on Refresh and access tokens for keeping user logged in...
  //   //https://www.richardkotze.com/coding/send-jwt-client-apollo-graphql <- Looks worth a read
  // }

  state = {
    buttonStyle: { backgroundColor: buttonGrey, color: buttonTextGrey },
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPass: "",
    PromoCode: "",
    zipCode: "",
    //keep this as true during dev if you don't want to keep loggin in
    success: true,
    // success: false,
    username: "",
  };

  //nameSpace created for Register functionality
  RegisterFormFunctions = {
    /**
     * changeTextInput is exact same function used in LoginFormFunction the only difference in the logic is
     * the conditional for highlighting the button color
     * so we point the changeText from RegisterForm to the changeText inside LoginFormFunction adhering to DRY
     */
    changeTextInput: (property, value)=> { this.LoginFormFunctions.changeTextInput(property, value);
      if (this.state.zipCode.length > 3) {
        this.setState({
          buttonStyle: { backgroundColor: dimOrange, color: buttonBlack },
        });
      } else if (this.state.zipCode.length < 1) {
        this.setState({
          buttonStyle: { backgroundColor: buttonGrey, color: buttonTextGrey },
        });
      }
    },
    //This should only be called by MUTATION

    _confirm: (data) => this.LoginFormFunctions._confirm(data),
  };

  //nameSpace created for loginForm functionality
  LoginFormFunctions = {
    //Change the style color and form control
    changeTextInput: (property, value) => {
      this.setState({
        [property]: value,
      });
      if (this.state.email.length > 1 && this.state.password.length > 1) {
        this.setState({
          buttonStyle: { backgroundColor: dimOrange, color: buttonBlack },
        });
      } else if (this.state.email.length < 1) {
        this.setState({
          buttonStyle: { backgroundColor: buttonGrey, color: buttonTextGrey },
        });
      }
    },
    //Once data is returned from API, _confirm is fired by MUTATION
    _confirm: async (data) => {
      // console.log(data)
      let token = data.login.token;
      this.LoginFormFunctions._saveUserData(token, data);
    },
    _saveUserData: async (token, data) => {
      try {
        await AsyncStorage.setItem(AUTH_TOKEN, token);
      } catch (e) {
        console.log(e);
      }
      this.setState({
        success: true,
        username: data.login.user.name,
      });
    },
  };
  render() {
    const { zipCode, name, success, email, password, buttonStyle } = this.state;

    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            {success ? (
              <Stack.Screen name="test" component={HomeScreen} 
              options={{
                headerTitle: props => <MainTitle {...props} />,
                }} />
            ) : (
              <>
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
                <Stack.Screen
                  name="ZipConfirm"
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <ZipConfirm
                      buttonStyle={buttonStyle}
                      zipCode={zipCode}
                      changeInputText={
                        this.RegisterFormFunctions.changeTextInput
                      }
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen name="LoginForm" options={{ headerShown: false }}>
                  {(props) => (
                    <LoginForm
                      buttonStyle={buttonStyle}
                      email={email}
                      changeInputText={this.LoginFormFunctions.changeTextInput}
                      password={password}
                      _confirm={this.LoginFormFunctions._confirm}
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
//Only exists for development stage
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}
function MainTitle() {
  return (
    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
      <Icofont icon="icofont-gear" size="2"/>
      <Text style={
        {         display: "flex",
          alignItems: "center",
          justifyContent: "center",
                  textAlign: 'center',
                  letterSpacing: 3,}}>CURRENT BEERS</Text>
      {/* change this true to be some kind of notification variable */}
      {true ? <Icofont icon="icofont-alarm" size="2"/> : <Icofont icon="icofont-notification" size="2" />}
    </View>
  );
}

export default App;

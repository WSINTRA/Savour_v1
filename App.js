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
import { Register, LoginForm, Welcome } from "./components";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import gql from "graphql-tag";
import AsyncStorage from "@react-native-community/async-storage";

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
  componentDidMount() {
    try {
      token = Apollo.getData(AUTH_TOKEN).then((data) =>
        console.log("value is", data)
      );
    } catch {
      console.log("no token found");
    }
    //ToDO - Work on Refresh and access tokens for keeping user logged in...
    //https://www.richardkotze.com/coding/send-jwt-client-apollo-graphql <- Looks worth a read
  }
  state = {
    buttonStyle: { backgroundColor: "#faf6f2", color: "#b5b5b5" },
    email: "",
    password: "",
    name: "",
    //keep this as true during dev if you don't want to keep loggin in
    success: false,
    username: "",
  };

  RegisterFormFunctions = {
    changeTextInput: (property, value) => {
      this.setState({
        [property]: value,
      })},
      //This should only be called by MUTATION
    _confirm: (data)=>this.LoginFormFunctions._confirm(data)
  };

  LoginFormFunctions = {
    //Change the style color and form control
    changeTextInput: (property, value) => {
      this.setState({
        [property]: value,
      });
      if (this.state.email.length > 1 && this.state.password.length > 1) {
        this.setState({
          buttonStyle: { backgroundColor: "#c7681a", color: "#1c1c1c" },
        });
      } else if (this.state.email.length < 1) {
        this.setState({
          buttonStyle: { backgroundColor: "#faf6f2", color: "#b5b5b5" },
        });
      }
    },
    //Once data is returned from API, _confirm is fired by MUTATION
    _confirm: async (data) => {
      // console.log(data)
      let token = data.login.token;
      // const { token } = this.state.login ? data.login : data.signup
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
    const { name, success, email, password, buttonStyle } = this.state;

    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {success ? (
              <Stack.Screen name="test" component={HomeScreen} />
            ) : (
              <>
                <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="RegisterForm" options={{ headerShown: false }}> 
                {(props) => (
                    <Register
                      buttonStyle={buttonStyle}
                      email={email}
                      name={name}
                      changeInputText={this.RegisterFormFunctions.changeTextInput}
                      password={password}
                      _confirm={this.RegisterFormFunctions._confirm}
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

export default App;

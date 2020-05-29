import "react-native-gesture-handler";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "./constants";
import Welcome from './components/Welcome.js';
import LoginForm from './components/LoginForm.js'
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import gql from "graphql-tag";
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const httpLink = createHttpLink({
  uri: "http://192.168.0.12:4000",
});
const _confirm = async (data) => {
  const { token } = this.props.login ? data.login : data.signup;
  this._saveUserData(token, data);
};
const _saveUserData = async (token, data) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN, token)
  } catch (e) {
    console.log(e)
  }
  this.props.succesful(data);
};
const getData = async (AUTH_TOKEN) => {
  try {
    const value = await AsyncStorage.getItem(AUTH_TOKEN);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
const authLink = setContext((_, { headers }) => {
  const token = getData(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

class App extends React.Component {
  state = {
    buttonStyle: { backgroundColor: "#faf6f2", color: "#b5b5b5" },
    login: false,
    signup: false,
    email: "",
    password: "",
    name: "",
    success: false,
  };
  //Change the style color and form control
  //passes down to login form for input values
  changeTextInput = (property, value) => {
    // console.log(property, value, this.state, "Log ")
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
  };
  //enables switching of the views between login form and signup
  switchSignBool = (signup) => {
    this.setState({ signup: !signup });
  };
  switchLoginBool = (login) => {
    this.setState({ login: !login });
  };

  //when login is succesful, we get success, this controls view for user
  loginSuccess = () => {
    this.setState({
      success: true,
    });
  };
  render() {
    const { signup, login, email, name, password, buttonStyle } = this.state;
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            
            <Stack.Screen name="LoginForm">
              {props=> <LoginForm 
              buttonStyle={buttonStyle} 
              email={email}
              changeInputText={this.changeTextInput}
              password={password}
              confirm={_confirm}
              />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default App;

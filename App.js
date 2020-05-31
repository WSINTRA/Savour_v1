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

//Using AsyncStorage for JWT tokens
const getData = async (AUTH_TOKEN) => {
  try {
    const value = await AsyncStorage.getItem(AUTH_TOKEN);
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
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
  const token = getData(AUTH_TOKEN).then(token=>{
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  }
});
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


class App extends React.Component {
  componentDidMount(){
    token = getData(AUTH_TOKEN).then(data=>console.log("value is", data))
    //ToDO - Work on Refresh and access tokens for keeping user logged in...
  }
  state = {
    buttonStyle: { backgroundColor: "#faf6f2", color: "#b5b5b5" },
    login: false,
    signup: false,
    email: "",
    password: "",
    name: "",
    success: false,
    username: ""
    // succesful: {}
  };

  _confirm = async (data) => {
    let token = data.login.token
    // const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token, data);
  };
  _saveUserData = async (token, data) => {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN, token)
    } catch (e) {
      console.log(e)
    }
    this.setState({
      success: true,
      username: data.login.user.name
    })
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
    const { signup, success, email, name, password, buttonStyle } = this.state;

    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {success ? <Stack.Screen name="test" component={HomeScreen}/> : 
            <>
            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            
            <Stack.Screen name="LoginForm" options={{headerShown: false}}>
              {props=> <LoginForm 
              buttonStyle={buttonStyle} 
              email={email}
              changeInputText={this.changeTextInput}
              password={password}
              _confirm={this._confirm}
              />}
              
            </Stack.Screen></>}
            
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

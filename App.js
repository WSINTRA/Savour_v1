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
import { NewUserStartPage, ReturningUser } from "./comps";
////////////////////////////////////////////////////////////////
//Wraps the app so that a navigation object can be used for screen navigations
////////////////////////////////////////////////////////////////
import { NavigationContainer } from "@react-navigation/native";
////////////////////////////////////////////////////////////////
//Storage used in React Native, instead of LocalStorage on web
////////////////////////////////////////////////////////////////
import AsyncStorage from "@react-native-community/async-storage";
////////////////////////////////////////////////////////////////
//Any colors for styling should be created in colors and then imported where they are needed
////////////////////////////////////////////////////////////////
import { dimOrange, buttonGrey, buttonTextGrey, offWhite } from "./colors";
////////////////////////////////////////////////////////////////
//Apollo created as a nameSpace for all functionality of Apollo
////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////
//this client is passed into the Apollo App wrapper
////////////////////////////////////////////////////////////////
const client = new ApolloClient({
  link: Apollo.authLink.concat(Apollo.httpLink),
  cache: new InMemoryCache(),
});

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
    promoCode: "",
    zipCode: "",
    //keep this as true during dev if you don't want to keep loggin in
    success: false,
    username: "",
  };
  ////////////////////////////////////////////////////////////////
  //nameSpace created for Register functionality
  ////////////////////////////////////////////////////////////////
  RegisterFormFunctions = {
    //This function resets button color when changing view, call it with your navigation onPress
    //onPress={()=> {changeButtonStyle();navigation.push("ExamplePage")}  }
    changeButtonStyle: () => {
      this.setState({
        buttonStyle: { backgroundColor: buttonGrey, color: buttonTextGrey },
      });
    },

    //this function will check based on rules if it should change button color
    checkForReadyButton: (rules) => {
      if (rules) {
        this.setState({
          buttonStyle: { backgroundColor: dimOrange, color: offWhite },
        });
      } else if (!rules) {
        this.RegisterFormFunctions.changeButtonStyle();
      }
    },
    /**
     * changeTextInput is exact same function used in LoginFormFunction
     * so we point the changeText from RegisterForm to the changeText inside LoginFormFunction adhering to DRY
     */
    changeTextInput: (property, value) => {
      this.LoginFormFunctions.changeTextInput(property, value);
    },
    _confirm: async (data) => {
      let token = data.signup.token;
      this.RegisterFormFunctions._saveUserData(token, data);
    },
    _saveUserData: async (token, data) => {
      try {
        await AsyncStorage.setItem(AUTH_TOKEN, token);
      } catch (e) {
        console.log(e);
      }
      this.setState({
        success: true,
        username: data.signup.user.firstName,
        password: "",
        confirmPass: "",
      });
    },
  };
////////////////////////////////////////////////////////////////
//nameSpace created for loginForm functionality
////////////////////////////////////////////////////////////////
  LoginFormFunctions = {
    //Change the style color and form control
    changeTextInput: (property, value) => {
      this.setState({
        [property]: value,
      });
    },
    //Once data is returned from API, _confirm is fired by MUTATION
    _confirm: async (data) => {
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
        username: data.login.user.firstName,
        confirmPass: "",
        password: "",
      });
    },
  };
  ////////////////////////////////////////////////////////////////
  //namespace for User functions
  ////////////////////////////////////////////////////////////////
  UserFunctions = {
    //Reset state related to user to original empty strings
    logout: () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPass: "",
        promoCode: "",
        zipCode: "",
        success: false,
        username: "",
      });
      this.RegisterFormFunctions.changeButtonStyle();
    },
  };

  render() {
    const { success } = this.state;
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <>
            {success ? (
              <ReturningUser logout={this.UserFunctions.logout} />
            ) : (
              <NewUserStartPage
                {...this.state}
                LoginFormFunctions={this.LoginFormFunctions}
                RegisterFormFunctions={this.RegisterFormFunctions}
              />
            )}
          </>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
export default App;

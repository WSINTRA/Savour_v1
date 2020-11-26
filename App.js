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
import { NewUserStartStack, ReturningUserStack } from "./comps";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { dimOrange, buttonGrey, buttonTextGrey, offWhite } from "./colors";
import { LoginFormFunctions, RegisterFormFunctions, UserFunctions } from './nameSpaces'

////////////////////////////////////////////////////////////////
//Apollo created as a nameSpace for all functionality of Apollo
////////////////////////////////////////////////////////////////
const Apollo = {
  httpLink: createHttpLink({
    uri: "http://192.168.0.12:4000",
  }),

  getToken: async (AUTH_TOKEN) => {
    try {
      const value = await AsyncStorage.getItem(AUTH_TOKEN);
      if (value !== null) {
        // We have token!!
        return value;
      }
    } catch (error) {
      // Error retrieving token
    }
  },

  authLink: setContext((_, { headers }) => {
    const token = Apollo.getToken(AUTH_TOKEN).then((token) => {
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
  
  render() {
    const { success } = this.state;
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <>
            {success ? (
              <ReturningUserStack logout={UserFunctions.logout} />
            ) : (
              <NewUserStartStack
                {...this.state}
                LoginFormFunctions={LoginFormFunctions}
                RegisterFormFunctions={RegisterFormFunctions}
              />
            )}
          </>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
}
export default App;

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
import {
  Disclaimer,
  LoginForm,
  Welcome,
  ZipConfirm,
  HomeScreen,
  CreateAccnt,
} from "./components";
//Wraps the app so that a navigation object can be used for screen navigations
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Storage used in React Native, instead of LocalStorage on web
import AsyncStorage from "@react-native-community/async-storage";
//Any colors for styling should be created in colors and then imported where they are needed
import {
  dimOrange,
  buttonGrey,
  buttonBlack,
  buttonTextGrey,
  backgroundWhite,
  offWhite,
} from "./colors";

//This stack and drawer is used in the NavigationContainers
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
    promoCode: "",
    zipCode: "",
    //keep this as true during dev if you don't want to keep loggin in
    // success: true,
    success: false,
    username: "",
  };

  //nameSpace created for Register functionality
  RegisterFormFunctions = {
    //This function resets button color when changing view, call it with your navigation onPress
    //onPress={()=> {changeButtonStyle();navigation.push("ExamplePage")}  }
    changeButtonStyle: ()=>{
      this.setState({
        buttonStyle: { backgroundColor: buttonGrey, color: buttonTextGrey },
      })
    },
    /**
     * changeTextInput is exact same function used in LoginFormFunction the only difference in the logic is
     * the conditional for highlighting the button color
     * so we point the changeText from RegisterForm to the changeText inside LoginFormFunction adhering to DRY
    */
    //this function will check based on rules if it should change button color 
    checkForReadyButton: (rules)=>{
        if(rules){
            this.setState({
                buttonStyle: { backgroundColor: dimOrange, color: offWhite },
            })
        }
        else if(!rules){
          this.RegisterFormFunctions.changeButtonStyle()
        }
    },
    changeTextInput: (property, value) => {
      this.LoginFormFunctions.changeTextInput(property, value);
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
    const {
      zipCode,
      firstName,
      lastName,
      success,
      email,
      password,
      buttonStyle,
      confirmPass,
      promoCode,
    } = this.state;

    const MyTheme = {
      dark: false,
      colors: {
        primary: buttonBlack,
        background: backgroundWhite,
        card: backgroundWhite,
        text: buttonGrey,
        border: dimOrange,
      },
    };
    return (
      <ApolloProvider client={client}>
        <>
          {success ? (
            <NavigationContainer theme={MyTheme}>
              <Drawer.Navigator>
                {/**This is where we will put the different pages that the side drawer will link too-
                 * Shipping Address
                 * Payments & Credits
                 * Account Info
                 * Promos
                 * Notifications
                 * Support
                 * Free Beer
                 * Logout
                 * Icons that link to social media
                 * Terms of Use
                 */}
                <Drawer.Screen name="Home" component={HomeScreen} />
              </Drawer.Navigator>
            </NavigationContainer>
          ) : (
            <>
              <NavigationContainer>
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
                  <Stack.Screen
                    name="ZipConfirm"
                    options={{ headerShown: false }}
                  >
                    {(props) => (
                      <ZipConfirm
                        buttonStyle={buttonStyle}
                        zipCode={zipCode}
                        checkForReadyButton={this.RegisterFormFunctions.checkForReadyButton}
                        changeButtonStyle={this.RegisterFormFunctions.changeButtonStyle}
                        changeInputText={
                          this.RegisterFormFunctions.changeTextInput
                        }
                      />
                    )}
                  </Stack.Screen>
                  <Stack.Screen
                    name="CreateAccnt"
                    options={{ headerShown: false }}
                  >
                    {(props) => (
                      <CreateAccnt
                        buttonStyle={buttonStyle}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                        password={password}
                        confirmPass={confirmPass}
                        promoCode={promoCode}
                        checkForReadyButton={this.RegisterFormFunctions.checkForReadyButton}
                        changeInputText={
                          this.RegisterFormFunctions.changeTextInput
                        }
                      />
                    )}
                  </Stack.Screen>

                  <Stack.Screen
                    name="LoginForm"
                    options={{ headerShown: false }}
                  >
                    {(props) => (
                      <LoginForm
                        buttonStyle={buttonStyle}
                        email={email}
                        changeInputText={
                          this.LoginFormFunctions.changeTextInput
                        }
                        password={password}
                        _confirm={this.LoginFormFunctions._confirm}
                      />
                    )}
                  </Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
            </>
          )}
        </>
      </ApolloProvider>
    );
  }
}
export default App;

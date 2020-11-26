 ////////////////////////////////////////////////////////////////
  //namespace for User functions
  ////////////////////////////////////////////////////////////////
  export const UserFunctions = {
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

////////////////////////////////////////////////////////////////
  //nameSpace created for loginForm functionality
  ////////////////////////////////////////////////////////////////
  export const LoginFormFunctions = {
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
  //nameSpace created for Register functionality
  ////////////////////////////////////////////////////////////////
  export const RegisterFormFunctions = {
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
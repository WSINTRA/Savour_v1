import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {HomeScreen} from "../../comps.js";
import { CustomDrawerContent } from '../../utilities';

const ReturningUser = (props) => {
  const Drawer = createDrawerNavigator();
  const { logout } = props;
  return (
    //Custom draw can be found in utilities folder, this is where we create the labels and icons for the nav drawer,
    // Then we can create navigation.push() events to the Drawer Screens below
    <Drawer.Navigator
      drawerStyle={{ paddingTop: 40, paddingLeft: 10, paddingRight: 10 }}
      drawerContent={(props) => <CustomDrawerContent logout={logout} {...props} />}
    >
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
      <Drawer.Screen name="Shipping Address" component={HomeScreen} />
      <Drawer.Screen name="Payments & Credits" component={HomeScreen} />
      <Drawer.Screen name="Account Info" component={HomeScreen} />
      <Drawer.Screen name="Promos" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={HomeScreen} />
      <Drawer.Screen name="Support" component={HomeScreen} />
      <Drawer.Screen name="Free beer" component={HomeScreen} />
      <Drawer.Screen name="Log out" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
export default ReturningUser;
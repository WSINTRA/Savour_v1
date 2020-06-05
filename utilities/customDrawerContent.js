import * as React from "react";
import { Text, } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem, 
  } from '@react-navigation/drawer';
import { drawerStyles } from '../styles/global';
import { Divider } from 'react-native-elements';
import { dimOrange, } from "../colors";
function customDrawerContent(props) {

return (<DrawerContentScrollView {...props}>
        
    <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Shipping Address</Text>}
      />
       <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Payments & Credits</Text>}
      />
       <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Account Info</Text>}
      />
       <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Promos</Text>}
      />
       <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Notifications</Text>}
      />
      <Divider style={{marginBottom:6, borderWidth: 0.5, borderColor:dimOrange}}/>
      <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Support</Text>}
      />
      <DrawerItem
        label={({ focused, color }) => <Text style={drawerStyles.label}>Free Beer</Text>}
      />
      <DrawerItem
        onPress={()=>props.logout()}
        label={({ focused, color }) => <Text style={drawerStyles.label}>Log Out</Text>}
      />
    </DrawerContentScrollView>
    );
}
export default customDrawerContent;

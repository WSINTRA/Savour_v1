import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CurrentBeers , YourCrates, Subscribe, MyBeers} from '../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { buttonBlack } from '../colors'
function HomeScreen() {
    const Tab = createBottomTabNavigator();
    const iconSize = 32;
return (
    <Tab.Navigator 
    initialRouteName="Current Beers"
    tabBarOptions={{showLabel: false}}
    >
    <Tab.Screen 
    name="Current Beers" 
    component={CurrentBeers} 
    options={{
      tabBarLabel: 'Current Beers',
      tabBarIcon: () => (
        <MaterialCommunityIcons style={{color: buttonBlack}} name="home" size={iconSize} />
      ),
    }}/>
    <Tab.Screen 
    name="Your Crates" component={YourCrates} 
    options={{
      tabBarLabel: 'Your Crates',
      tabBarIcon: () => (
       <MaterialCommunityIcons style={{color: buttonBlack}} name="cube-outline" size={iconSize} />
      ),
    }}/>
    <Tab.Screen name="Subscribe" component={Subscribe} 
    options={{
      tabBarLabel: 'Subscribe',
      tabBarIcon: () => (
        <MaterialCommunityIcons style={{color: buttonBlack}} name="autorenew" size={iconSize} />
      ),
    }}/>
    <Tab.Screen name="My Beers" component={MyBeers} 
    options={{
      tabBarLabel: 'My Beers',
      tabBarIcon: () => (
        <MaterialCommunityIcons style={{color: buttonBlack}} name="star-outline" size={iconSize} />
      ),
    }}/>
  </Tab.Navigator>
)
}
export default HomeScreen;

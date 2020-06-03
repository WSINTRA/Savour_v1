import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CurrentBeers , YourCrates, Subscribe, MyBeers} from '../components';
import Icofont from "react-icofont";
import { buttonBlack } from '../colors'
function HomeScreen() {
    const Tab = createBottomTabNavigator();
    const iconSize = 2;
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
        <Icofont icon="icofont-home" style={{color: buttonBlack}}  size={iconSize} />
      ),
    }}/>
    <Tab.Screen 
    name="Your Crates" component={YourCrates} 
    options={{
      tabBarLabel: 'Your Crates',
      tabBarIcon: () => (
        <Icofont icon="icofont-cube" style={{color: buttonBlack}}  size={iconSize} />
      ),
    }}/>
    <Tab.Screen name="Subscribe" component={Subscribe} 
    options={{
      tabBarLabel: 'Subscribe',
      tabBarIcon: () => (
        <Icofont icon="icofont-refresh" style={{color: buttonBlack}}  size={iconSize} />
      ),
    }}/>
    <Tab.Screen name="My Beers" component={MyBeers} 
    options={{
      tabBarLabel: 'My Beers',
      tabBarIcon: () => (
        <Icofont icon="icofont-star" style={{color: buttonBlack}} size={iconSize} />
      ),
    }}/>
  </Tab.Navigator>
)
}
export default HomeScreen;

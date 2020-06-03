import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CurrentBeers , YourCrates, Subscribe, MyBeers} from '../components';
function HomeScreen() {
    const Tab = createBottomTabNavigator();
return (
    <Tab.Navigator>
    <Tab.Screen name="Current Beers" component={CurrentBeers} />
    <Tab.Screen name="Your Crates" component={YourCrates} />
    <Tab.Screen name="Subscribe" component={Subscribe} />
    <Tab.Screen name="My Beers" component={MyBeers} />
  </Tab.Navigator>
)
}
export default HomeScreen;

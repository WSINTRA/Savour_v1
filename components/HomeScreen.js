import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CurrentBeers, YourCrates, Subscribe, MyBeers } from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { buttonBlack } from "../colors";

function HomeScreen() {
  const Tab = createBottomTabNavigator();
  const iconSize = 32;
  return (
    <Tab.Navigator
      initialRouteName="Current Beers"
      activeColor={buttonBlack}
      labelStyle={{ fontSize: 12 }}
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Current Beers"
        component={CurrentBeers}
        options={{
          tabBarLabel: "Current Beers",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
            name="home" 
            color={color} 
            size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Crates"
        component={YourCrates}
        options={{
          tabBarLabel: "Your Crates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name="cube-outline"
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          tabBarLabel: "Subscribe",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name="autorenew"
              size={iconSize}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Beers"
        component={MyBeers}
        options={{
          tabBarLabel: "My Beers",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons 
            color={color} 
            name="star" 
            size={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default HomeScreen;

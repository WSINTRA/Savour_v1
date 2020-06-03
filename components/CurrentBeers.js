import * as React from "react";
import {MainTitle } from '../components';
import { View, Text } from "react-native";

function currentBeers() {
return (
    <>
    <MainTitle headingTitle={"CURRENT BEERS"}/>
    <View><Text>This is where the current beers component will go</Text></View>
    </>
)
}
export default currentBeers;

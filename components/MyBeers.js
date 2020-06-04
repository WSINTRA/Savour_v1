import * as React from "react";
import { MainTitle} from '../comps';
import { View, Text } from "react-native";

function MyBeers() {
return (
    <>
    <MainTitle headingTitle={"MY BEERS"} rightIcon={"blank"}/>
    <View><Text>This is where Your My Beers comp will go</Text></View>
    </>
)
}
export default MyBeers;

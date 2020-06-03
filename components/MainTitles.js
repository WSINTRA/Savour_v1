import React from "react";
import { mainStyles } from '../styles/global'
import { View, Text, } from "react-native";
import Icofont from "react-icofont";
import { useNavigation } from "@react-navigation/native";
import { buttonBlack, dimOrange } from '../colors';
export default function MainTitle(props) {
  const navigation = useNavigation();
  return (
    <View
      style={mainStyles.mainTitle}
    >
      <Text onPress={() => navigation.openDrawer()}>
        <Icofont style={{color: buttonBlack}}  icon="icofont-gear" size="2" />
      </Text>
      <Text
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          letterSpacing: 3,
        }}
      >
        {props.headingTitle}
       
      </Text>
      <Text>
      {/* change this true to be some kind of notification variable */}
      {true ? (
        <Icofont style={{color: buttonBlack}}  icon="icofont-alarm" size="2" />
      ) : (
        <Icofont
          style={{ color: dimOrange }}
          icon="icofont-notification"
          size="2"
        />
      )}
      </Text>
    </View>
  );
}
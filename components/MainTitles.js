import React from "react";
import { mainStyles } from '../styles/global'
import { View, Text, } from "react-native";
import Icofont from "react-icofont";
import { useNavigation } from "@react-navigation/native";

export default function MainTitle() {
  const navigation = useNavigation();
  return (
    <View
      style={mainStyles.mainTitle}
    >
      <Text onPress={() => navigation.openDrawer()}>
        <Icofont icon="icofont-gear" size="2" />
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
        CURRENT BEERS
      </Text>
      <Text>
      {/* change this true to be some kind of notification variable */}
      {true ? (
        <Icofont icon="icofont-alarm" size="2" />
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
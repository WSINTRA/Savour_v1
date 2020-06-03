import React from "react";
import { mainStyles } from '../styles/global'
import { View, Text, } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { buttonBlack, dimOrange } from '../colors';
export default function MainTitle(props) {
  const navigation = useNavigation();
  return (
    <View
      style={mainStyles.mainTitle}
    >
      <Text onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons style={{color: buttonBlack}} name="settings-outline" size="26" />
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
        <MaterialCommunityIcons style={{color: buttonBlack}} name="bell-outline" size="26" />
      
      ) : (
        <MaterialCommunityIcons style={{color: buttonBlack}} name="bell-ring-outline" size="26" />
       
      )}
     </Text>
    </View>
  );
}
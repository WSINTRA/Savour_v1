import React from "react";
import { mainStyles } from '../../styles/global'
import { View, Text,TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { buttonBlack, offWhite } from '../../colors';

export default function MainTitle(props) {
  const iconSize = 32;
  const navigation = useNavigation();
  return (
    <View
      style={mainStyles.mainTitle}
    >
      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons style={{color: buttonBlack}} name="settings-outline" size={iconSize} />
      </TouchableOpacity>
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
      <TouchableOpacity>
      {/* change this true to be some kind of notification variable */}
      {props.rightIcon == "blank" ? <MaterialCommunityIcons style={{color: offWhite}} name={props.rightIcon} size={iconSize}/> :
      <MaterialCommunityIcons style={{color: buttonBlack}} name={props.rightIcon} size={iconSize} />}
        
     
     </TouchableOpacity>
    </View>
  );
}
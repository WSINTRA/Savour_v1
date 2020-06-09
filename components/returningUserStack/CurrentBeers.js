// import * as React from "react";
import { MainTitle } from "../../comps";
// import { View, Text } from "react-native";
import { FadeInView } from "../../fadeInView";
import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  useWindowDimensions,
} from "react-native";
import { offWhite, dimOrange,buttonGrey,borderGrey } from "../../colors";
const { height, width } = Dimensions.get("window");

function currentBeers() {
  return (
    <FadeInView>
      <MainTitle headingTitle={"CURRENT BEERS"} rightIcon={"bell-outline"} />

      <ScrollingBeers />
    </FadeInView>
  );
}
export default currentBeers;

//This component has to render a slide paginated component with different beers available.
//Begin by creating 2 mock beers with an image, a title, a subtitle and a description
//Once mock data is created implement a sliding navigation

const MockData = [
  {
    title: "Mock Beer 1",
    subtitle: "Mock Beer 1 made at home",
    availability: "GET IT",
    description:
      "lorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaalorem ipsum laddee laddaaa",
    image:
      "https://media1.fdncms.com/pittsburgh/imager/u/original/16003077/pittsburghrhythmandbooze.jpg",
  },
  {
    title: "Mock Beer 2",
    subtitle: "Mock Beer 2 made in anothe rplace",
    availability: "SOLD OUT",
    description:
      "ANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goes",
    image:
      "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/Dancing-Gnome-2-1580417336.jpg",
  },
  {
    title: "Mock Beer 3",
    subtitle: "Mock Beer 3 made in anothe rplace",
    availability: "SOLD OUT",
    description:
      "ANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goesANything goes",
    image:
      "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/Dancing-Gnome-2-1580417336.jpg",
  },
];

function ScrollingBeers() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();
  const { height: windowHeight } = useWindowDimensions();
  return (
    <SafeAreaView>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
        >
          {MockData.map((prodCard, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 545 }}
                key={imageIndex}
              >
                <ScrollView>
                  <Image source={{ uri: prodCard.image }} style={styles.card} />
                  <Text style={styles.infoText}>{prodCard.title}</Text>
                  <Text>{prodCard.subtitle}</Text>
                  <Text>{prodCard.description}</Text>
                  <Text>{prodCard.description}</Text>
                  <Text>{prodCard.description}</Text>
                </ScrollView>
                <View style={[styles.cardButton, prodCard.availability == "SOLD OUT" ? {backgroundColor:borderGrey} : {backgroundColor:dimOrange} ]}><Text style={prodCard.availability == "SOLD OUT" ? {color:buttonGrey} : {color:offWhite} } >{prodCard.availability}</Text></View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {MockData.map((image, imageIndex) => {
            const color = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: ["white", "black", "white"],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { backgroundColor: color }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: offWhite,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardButton: {
    backgroundColor: dimOrange,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    letterSpacing: 3,
    width: width,
    height: 40,
    textAlign: "center",
    flexDirection: "row",
    margin: "auto",
  },
  card: {
    width: 400,
    height: 350,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.5)",
    width: width,
    height: 12,
    bottom:42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

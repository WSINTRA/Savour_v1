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
import {
  offWhite,
  dimOrange,
  buttonGrey,
  borderGrey,
  buttonBlack,
  buttonTextGrey,
} from "../../colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  //   const { width: windowWidth } = useWindowDimensions();
  //   const { height: windowHeight } = useWindowDimensions();
  return (
    <SafeAreaView>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
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
                style={{ width: width, height: height - 120 }}
                key={imageIndex}
              >
                <ScrollView>
                  <Image
                    source={{ uri: prodCard.image }}
                    style={styles.cardImage}
                  />

                  <View style={styles.cardDetails}>
                    <View style={styles.floatingShare}>
                      <MaterialCommunityIcons
                        style={{ color: offWhite }}
                        name="share-variant"
                        size={32}
                      />
                    </View>
                    <View>
                      <Text style={styles.infoTitle}>{prodCard.title}</Text>
                    </View>
                    <View>
                      <Text style={styles.infoSubtitle}>
                        {prodCard.subtitle}
                      </Text>
                    </View>
                    <View style={styles.infoDescription}>
                      <Text>{prodCard.description}</Text>
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={[
                    styles.cardButton,
                    prodCard.availability == "SOLD OUT"
                      ? { backgroundColor: borderGrey }
                      : { backgroundColor: dimOrange },
                  ]}
                >
                  <Text
                    style={[
                      prodCard.availability == "SOLD OUT"
                        ? { color: buttonGrey }
                        : { color: offWhite },
                      styles.cardButtonText,
                    ]}
                  >
                    {prodCard.availability}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {MockData.map((image, imageIndex) => {
            const color = scrollX.interpolate({
              inputRange: [
                width * (imageIndex - 1),
                width * imageIndex,
                width * (imageIndex + 1),
              ],
              outputRange: [buttonTextGrey, buttonBlack, buttonTextGrey],
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
  cardDetails: {
    flex: 1,
    justifyContent: "flex-start",
  },
  floatingShare: {
    position: "absolute",
    right: 30,
    top: -20,
    backgroundColor: dimOrange,
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardButton: {
    backgroundColor: dimOrange,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    width: width,
    height: 50,
    textAlign: "center",
    flexDirection: "row",
    margin: "auto",
  },
  cardButtonText: {
    letterSpacing: 3,
    fontWeight: "bold",
  },
  cardImage: {
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
  infoTitle: {
    paddingTop: 30,
    textTransform: "uppercase",
    color: buttonGrey,
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSubtitle: {
    paddingTop: 10,
    textTransform: "uppercase",
    color: buttonGrey,
    fontSize: 16,
  },
  infoDescription: {
    paddingTop: 10,
    color: buttonGrey,
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
    backgroundColor: "rgba(255,255,255, 0.8)",
    width: width,
    height: 12,
    bottom: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

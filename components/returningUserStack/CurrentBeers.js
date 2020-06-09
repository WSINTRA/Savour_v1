// import * as React from "react";
import { MainTitle } from "../../comps";
// import { View, Text } from "react-native";
import { FadeInView } from "../../fadeInView";
import React, { useRef, useState } from "react";
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
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

//TODO : Build out share button

const BEER_QUERY = gql`
  {
    product(filter: "") {
      beers {
        name
        image
        abv
        body
        description
        notes
        availability
      }
    }
  }
`;

function ScrollingBeers() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [beerState, setBeersState] = useState([{ name: "Loading" }]);
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
          {beerState.map((prodCard, imageIndex) => {
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
                      {/* Build out this share function so it shares the current Beer/product */}
                      <MaterialCommunityIcons
                        style={{ color: offWhite }}
                        name="share-variant"
                        size={32}
                      />
                    </View>
                    <View>
                      <Text style={styles.infoTitle}>{prodCard.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.infoSubtitle}>{prodCard.body}</Text>
                      <Text>ABV: {prodCard.abv}</Text>
                    </View>
                    <View style={styles.infoDescription}>
                      <Text>{prodCard.description}</Text>
                    </View>
                    <View style={styles.infoDescription}>
                      <Text>{prodCard.notes}</Text>
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={[
                    styles.cardButton,
                    prodCard.availability
                      ? { backgroundColor: dimOrange }
                      : { backgroundColor: buttonTextGrey },
                  ]}
                >
                  <Text
                    style={[
                      prodCard.availability
                        ? { color: buttonGrey }
                        : { color: offWhite },
                      styles.cardButtonText,
                    ]}
                  >
                    {prodCard.availability ? "GET IT" : "SOLD OUT"}
                  </Text>
                </View>
              </View>
            );
          })}
          <Query query={BEER_QUERY}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <View>
                    <Text>Fetching</Text>
                  </View>
                );
              if (error) return <Text>Error{console.log(error)}</Text>;
              const productData = data.product.beers;
              setBeersState(productData);
              return null;
            }}
          </Query>
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {beerState
            ? beerState.map((image, imageIndex) => {
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
              })
            : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
//Put this styleSheet into the global.js and change references to styles in the components
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: offWhite,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardDetails: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
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

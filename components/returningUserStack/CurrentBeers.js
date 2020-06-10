import { currentBeerStyle } from "../../styles/global";
import { MainTitle } from "../../comps";
import { FadeInView } from "../../fadeInView";
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Share,
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  offWhite,
  dimOrange,
  buttonGrey,
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

const onShare = async (beerTitle) => {
  try {
    const result = await Share.share({
      message: `@Savour has ${beerTitle} for sale today. This will sell out quickly, so signup and grab a few now!`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

function ScrollingBeers() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [beerState, setBeersState] = useState([{ name: "Loading" }]);
  return (
    <SafeAreaView>
      <View style={currentBeerStyle.scrollContainer}>
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
                    style={currentBeerStyle.cardImage}
                  />

                  <View style={currentBeerStyle.cardDetails}>
                    <View style={currentBeerStyle.floatingShare}>
                      <TouchableOpacity onPress={() => onShare(prodCard.name)}>
                        <MaterialCommunityIcons
                          style={{ color: offWhite }}
                          name="share-variant"
                          size={32}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={currentBeerStyle.infoTitle}>
                        {prodCard.name}
                      </Text>
                    </View>
                    <View>
                      <Text style={currentBeerStyle.infoSubtitle}>
                        {prodCard.body}
                      </Text>
                      <Text>ABV: {prodCard.abv}</Text>
                    </View>
                    <View style={currentBeerStyle.infoDescription}>
                      <Text>{prodCard.description}</Text>
                    </View>
                    <View style={currentBeerStyle.infoDescription}>
                      <Text>{prodCard.notes}</Text>
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={[
                    currentBeerStyle.cardButton,
                    prodCard.availability
                      ? { backgroundColor: dimOrange }
                      : { backgroundColor: buttonTextGrey },
                  ]}
                >
                  <Text
                    style={[
                      prodCard.availability
                        ? { color: buttonBlack }
                        : { color: offWhite },
                      currentBeerStyle.cardButtonText,
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
                //TODO: replace this with a loading screen
                return (
                  <View>
                    <Text>Fetching</Text>
                  </View>
                );
              //TODO: Create a more robust error logging method
              if (error) return <Text>Error{console.log(error)}</Text>;

              const productData = data.product.beers;
              //Assign query data into the state hook
              setBeersState(productData);
              return null;
            }}
          </Query>
        </ScrollView>

        <View style={currentBeerStyle.indicatorContainer}>
          {beerState //This creates the pagination visual animations on swiping through beers
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
                    style={[
                      currentBeerStyle.normalDot,
                      { backgroundColor: color },
                    ]}
                  />
                );
              })
            : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

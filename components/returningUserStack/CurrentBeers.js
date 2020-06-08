// import * as React from "react";
import { MainTitle } from "../../comps";
// import { View, Text } from "react-native";
import { FadeInView } from '../../fadeInView';
import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions
} from "react-native";
function currentBeers() {
  return (
    <FadeInView>
      <MainTitle headingTitle={"CURRENT BEERS"} rightIcon={"bell-outline"} />
      <View>
          
        <Text>This is where the current beers component will go</Text>
        <ScrollingBeers/>
      </View>
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
      description: "lorem ipsum laddee laddaaa",
      image:
        "https://media1.fdncms.com/pittsburgh/imager/u/original/16003077/pittsburghrhythmandbooze.jpg",
    },
    {
      title: "Mock Beer 2",
      subtitle: "Mock Beer 2 made in anothe rplace",
      description: "ANything goes",
      image:
        "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/Dancing-Gnome-2-1580417336.jpg",
    },
 
];


const images = [
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
  "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
];

function ScrollingBeers() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView >
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
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {MockData.map((prodCard, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth, height: 250 }}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: prodCard.image }} style={styles.card}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {prodCard.title}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {MockData.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1)
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp"
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
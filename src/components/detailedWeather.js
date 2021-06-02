import React, { useEffect, useState } from "react";
import { If, Else, Then } from "react-if";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ScrollView,
  Image,
  Animated,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import superagent from "superagent";
import { getImageBackgroundSrc } from "./backgroundImage";

function moreDetails(props) {
  const [weather, setWeather] = useState({});

  const getWeather = async (api) => {
    try {
      let response = await superagent.get(api);
      console.log("CURRENT LOCATION ==========", response.body);
      setWeather({
        date: response.body.forecast.forecastday[0].date,
        hour: response.body.forecast.forecastday[0].hour,
        temp: response.body.current.temp_c,
        icon: response.body.current.condition.icon,
        bgImage: getImageBackgroundSrc(response.body.current.condition.text),
        loading: false,
      });
      //   console.log("hourly Details", response.body.forecast.forecastday[0].hour);
    } catch (error) {
      console.error("An error occurred while getting data from API", error);
    }
  };
  useEffect(() => {
    const latitude = props.location.latitude;
    const longitude = props.location.longitude;
    const key = "cdcec5524fff4ae28d195512213105";
    const api = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no
    `;
    if (latitude && longitude) getWeather(api);
  }, [props.location]);
  let weatherPerHour = weather.hour ? weather.hour : [];
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {weather.loading ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <ImageBackground
          source={weather.bgImage}
          style={styles.imageContainer}
          imageStyle={styles.bgImage}
        >
          <View style={styles.eachForecastContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>
              {weather.date}
            </Text>
          </View>
          <View style={styles.eachForecastContainer}>
            <If condition={weatherPerHour.length > 0}>
              <Then>
                <ScrollView>
                  {weatherPerHour.map((hour) => {
                    if (hour.is_day) {
                      return (
                        <>
                          <Text
                            style={[styles.smallText, styles.textStyle]}
                            key={hour.time}
                          >
                            <Image
                              style={styles.image}
                              source={require("../../assets/icons/weather02-512.png")}
                            />
                            {hour.time.split(" ")[1]} : {hour.temp_c}°
                          </Text>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <Text
                            key={hour.time}
                            style={[styles.smallText, styles.textStyle]}
                          >
                            <Image
                              style={styles.image}
                              source={require("../../assets/icons/partly-cloudy-night.png")}
                            />
                            {hour.time.split(" ")[1]} : {hour.temp_c}°
                          </Text>
                        </>
                      );
                    }
                  })}
                </ScrollView>
              </Then>
              <Else>
                <ActivityIndicator color="black" size="large" />
              </Else>
            </If>
          </View>
        </ImageBackground>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  eachForecastContainer: {
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  searchTextInput: {
    flex: 1,
    color: "white",
  },
  imageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: 200,
    backgroundColor: "silver",
    //   alignItems: 'center',
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 40,
    alignContent: "center",
    // textAlign: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
  },
  textStyle: {
    textAlign: "center",
    padding: "5%",
    // fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 10
  },
  largeText: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 15,
    alignItems: 'center',
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    padding: 2,
    textAlignVertical: "center",
    borderColor: "#000",
    marginRight: 30
  },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
});

export default moreDetails;

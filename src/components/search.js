import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
  Animated,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import superagent from "superagent";
import { getImageBackgroundSrc } from "./backgroundImage";

function Search(props) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    const key = "cdcec5524fff4ae28d195512213105";
    const api = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`;
    try {
      // console.log({api});
      // console.log({city});
      weather.loading = true;
      let response = await superagent.get(api);
      console.log("SEARCH RESPONSE ===========", response.body);
      // setWeather(response.body.current.temp_c);
      setWeather({
        temp: response.body.current.temp_c,
        date: response.body.current.last_updated,
        icon: response.body.current.condition.icon,
        condition: response.body.current.condition.text,
        location: response.body.location.name,
        bgImage: getImageBackgroundSrc(response.body.current.condition.text),
        loading: false,
      });
      // console.log(weather.bgImage);
    } catch (error) {
      console.error("An error occurred while getting data from API", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {weather.loading ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <ImageBackground
          // source={require("../../assets/weather/lc.gif")}
          source={weather.bgImage}
          style={styles.imageContainer}
          imageStyle={styles.bgImage}
        >
          <View>
            <Text style={[styles.largeText, styles.textStyle]}>
              {weather.location}
            </Text>

            <Image style={styles.image} source={weather.icon} />
            <Text style={[styles.smallText, styles.textStyle]}>
              {weather.condition}
            </Text>
            <Text style={[styles.largeText, styles.textStyle]}>
              {weather.temp}°
            </Text>

            <TextInput
              nativeID="cityInput"
              placeholder="City Name"
              //   autoCorrect={false}
              //   placeholderTextColor="white"
              //   underlineColorAndroid="transparent"
              //   style={styles.searchTextInput}
              onChangeText={(city) => {
                setCity(city);
              }}
            />
            <Button onPress={getWeather} title="Search" />

            {/* <Text>{weather.temp}</Text>
            <Text>{weather.condition}</Text>
            <Text>{weather.icon}</Text>
            <Text>{weather.date}</Text> */}
          </View>
        </ImageBackground>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchTextInput: {
    flex: 1,
    color: "white",
  },
  imageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "silver",
    //   alignItems: 'center',
    justifyContent: "center",
  },
  containerInner: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  boxLabel: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
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

export default Search;

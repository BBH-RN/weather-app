import React, { useState } from "react";
import { If, Then } from "react-if";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Image,
	ImageBackground,
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
			weather.loading = true;
			let response = await superagent.get(api);
			//   console.log("SEARCH RESPONSE ===========", response.body);
			setWeather({
				temp: `${response.body.current.temp_c}°`,
				date: response.body.current.last_updated,
				icon: response.body.current.condition.icon,
				condition: response.body.current.condition.text,
				location: response.body.location.name,
				bgImage: getImageBackgroundSrc(
					response.body.current.condition.text
				),
				humidity: `${response.body.current.humidity}%`,
				windSpeed: `${response.body.current.wind_kph} km/h`,
				feelsLike: `${response.body.current.feelslike_c}°`,
				maxTemp: `${
					response.body.forecast.forecastday[0].day.maxtemp_c
						.toString()
						.split(".")[0]
				}°`,
				minTemp: `${
					response.body.forecast.forecastday[0].day.mintemp_c
						.toString()
						.split(".")[0]
				}°`,
				loading: false,
			});
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
					source={{ uri: weather.bgImage }}
					style={styles.imageContainer}
					imageStyle={styles.bgImage}
				>
					<TextInput
						nativeID="cityInput"
						placeholder="City Name"
						onChangeText={(city) => {
							setCity(city);
						}}
					/>
					<Button onPress={getWeather} title="Search" />
					<If condition={weather.temp}>
						<Then>
							<View style={styles.weatherContainer}>
								<View style={styles.singleWeatherContainer}>
									<Image
										style={styles.smallImage}
										source={require("../../assets/icons/location.png")}
									/>
									<Text
										style={[
											styles.largeText,
											styles.textStyle,
											styles.eachForecastContainer,
										]}
									>
										{weather.location}
									</Text>
								</View>
								<View style={styles.singleWeatherContainer}>
									<Image
										style={styles.image}
										source={{ uri: weather.icon }}
									/>
									<Text
										style={[
											styles.smallText,
											styles.textStyle,
										]}
									>
										{weather.condition}
									</Text>
								</View>
								<View style={styles.singleWeatherContainer}>
									<Text
										style={[
											styles.largeText,
											styles.textStyle,
										]}
									>
										{weather.temp}
									</Text>
									<Text
										style={[
											styles.smallestText,
											styles.textStyle,
										]}
									>
										{weather.maxTemp}/{weather.minTemp}
									</Text>
								</View>
								<View style={styles.detailsContainer}>
									<View style={styles.eachDetailContainer}>
										<Image
											style={styles.smallImage}
											source={require("../../assets/icons/humidity.png")}
										/>
										<Text
											style={[
												styles.smallestText,
												styles.textStyle,
											]}
										>
											{weather.humidity}
										</Text>
									</View>
									<View
										style={[
											styles.eachDetailContainer,
											styles.border,
										]}
									>
										<Image
											source={require("../../assets/icons/wind.png")}
											style={styles.smallImage}
										/>
										<Text
											style={[
												styles.smallestText,
												styles.textStyle,
											]}
										>
											{weather.windSpeed}
										</Text>
									</View>
									<View style={styles.eachDetailContainer}>
										<Text
											style={[
												styles.smallestText,
												styles.textStyle,
											]}
										>
											Feels Like: {weather.feelsLike}
										</Text>
									</View>
								</View>
							</View>
						</Then>
					</If>
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
		backgroundColor: "silver",
		justifyContent: "center",
	},
	image: {
		width: 50,
		height: 40,
		alignContent: "center",
		alignItems: "center",
	},
	tempContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignSelf: "stretch",
	},
	textInput: {
		backgroundColor: "#666",
		color: "white",
		height: 40,
		width: 50,
		marginTop: 20,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		alignSelf: "center",
	},
	//=================================================================\\
	weatherContainer: {
		marginTop: 25,
		display: "flex",
		alignItems: "center",
		width: 178,
		// alignSelf: "stretch",
	},
	singleWeatherContainer: {
		alignSelf: "stretch",
		alignItems: "center",
	},
	imageContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "silver",
		justifyContent: "center",
	},
	image: {
		width: 50,
		height: 40,
		margin: 10,
	},
	bgImage: {
		flex: 1,
		width: 300,
		// height: null,
		resizeMode: "cover",
	},
	eachDetailContainer: {
		width: 45,
		marginLeft: 3,
		marginRight: 3,
		alignSelf: "stretch",
		alignItems: "center",
	},
	border: {
		borderLeftWidth: 1,
		borderLeftColor: "rgba(255, 255, 255, 0.3)",
		borderRightWidth: 1,
		borderRightColor: "rgba(255, 255, 255, 0.3)",
	},
	tempContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignSelf: "stretch",
	},
	textStyle: {
		// textShadowColor: "#0000",
		// textShadowOffset: { width: -1, height: 1 },
		// textShadowRadius: 10,
		textAlign: "center",
		padding: "5%",
		color: "white",
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 20
	},
	largeText: {
		fontSize: 20,
	},
	smallText: {
		paddingTop: 0,
		fontSize: 15,
	},
	smallestText: {
		paddingTop: 0,
		marginTop: 3,
		fontSize: 10,
	},
	smallImage: {
		height: 20,
		width: 20,
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
		flexDirection: "row",
		marginTop: 10,
		height: 10,
		justifyContent: "center",
	},

});

export default Search;

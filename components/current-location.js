import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import superagent from "superagent";

function CurrentLocation(props) {
	const [weather, setWeather] = useState(null);

	const getWeather = async (api) => {
		try {
			let response = await superagent.get(api);
			console.log(response.body);
			setWeather(response.body.location.name);
		} catch (error) {
			console.error(
				"An error occurred while getting data from API",
				error
			);
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

	return (
		<View>
			<Text>{weather}</Text>
		</View>
	);
}

export default CurrentLocation;

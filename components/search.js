import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import superagent from "superagent";

function Search(props) {
	const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null); 

    const getWeather = async () => {
        const key = "cdcec5524fff4ae28d195512213105";
		const api = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`;
		try {
            console.log({api});
            console.log({city});
			let response = await superagent.get(api);
			console.log(response.body);
			setWeather(response.body.current.temp_c);
		} catch (error) {
			console.error(
				"An error occurred while getting data from API",
				error
			);
		}
	};

	return (
		<View>
			<TextInput
				nativeID="cityInput"
				placeholder="City Name"
                onChangeText={((city) => {setCity(city)})}
			/>
			<Button onPress={getWeather} title="Search" />

			<Text>{weather}</Text>
            
		</View>
	);
}

export default Search;

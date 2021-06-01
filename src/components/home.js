import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrentLocation from "./current-location";
import * as Location from "expo-location";

function Home() {
	const [location, setLocation] = useState({});
	const [errMsg, setErrorMsg] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied", status);
				return;
			}

			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
			});
			let state = {
				longitude: location.coords.longitude,
				latitude: location.coords.latitude,
			};
			setLocation(state);
		})();
	}, []);

	let longitude = "",
		latitude = "";
	if (errMsg) {
		let text = errMsg;
	} else if (location) {
		longitude = JSON.stringify(location.longitude);
		latitude = JSON.stringify(location.latitude);
	}

	return (
		<View style={styles.container}>
			<CurrentLocation location={location} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Home;

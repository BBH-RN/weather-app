import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Animated,
	useWindowDimensions,
} from "react-native";
import CurrentLocation from "./current-location";
import MoreDetails from "./detailedWeather";
import MoreDetails2 from './detailedWeather copy'
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
		text = errMsg;
	} else if (location) {
		longitude = JSON.stringify(location.longitude);
		latitude = JSON.stringify(location.latitude);
	}
	const { width: windowWidth, height: windowHeight } = useWindowDimensions();
	const scrollX = useRef(new Animated.Value(0)).current;
	return (
		<>
			<StatusBar barStyle="light-content" />
			<ScrollView
				horizontal={true}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					],
					{ useNativeDriver: false }
				)}
				scrollEventThrottle={1}
			>
				<View style={{ height: windowHeight }}>
					<CurrentLocation location={location} />
				</View>
				<View style={{ height: windowHeight }}>
					<MoreDetails location={location} />
				</View>
				<View style={{ height: windowHeight }}>
					<MoreDetails2 location={location} />
				</View>
			</ScrollView>
		</>
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

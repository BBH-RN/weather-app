import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import Search from "./components/search";
import Home from "./components/home";

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home"
				component={Home}
				options={{ tabBarLabel: "Home!" }}
			/>
		</HomeStack.Navigator>
	);
}

function SearchStackScreen() {
	return (
		<SearchStack.Navigator>
			<SearchStack.Screen
				name="Search"
				component={Search}
				options={{ tabBarLabel: "Search!" }}
			/>
		</SearchStack.Navigator>
	);
}

export default function App() {
	const Tab = createBottomTabNavigator();
	return (
		<View style={styles.container}>
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name="Current Location" component={HomeStackScreen} />
					<Tab.Screen
						name="Search"
						component={SearchStackScreen}
					/>
				</Tab.Navigator>
			</NavigationContainer>
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

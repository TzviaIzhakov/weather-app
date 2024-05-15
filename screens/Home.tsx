import { Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Header from '../components/Header';
import WeatherPreview from '../components/WeatherPreview';
import DailyForecast from '../components/DailyForecast';

export default function Home() {
	return (
		<ScrollView style={styles.homeContainer}>
			<StatusBar hidden={true} />
			<Header />
			<WeatherPreview />
			<DailyForecast />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
		position: 'relative',
		marginHorizontal: 8,
	},
});

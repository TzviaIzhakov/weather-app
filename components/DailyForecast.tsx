import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import WeatherForecastPreview from './WeatherForecastPreview';

export default function DailyForecast() {
	return (
		<View style={styles.dailyForecastContainer}>
			<View style={styles.headlineContainer}>
				<CalendarDaysIcon size={22} color={'white'} />
				<Text style={styles.headlineText}>Daily forecast</Text>
			</View>

			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
				<WeatherForecastPreview />
				<WeatherForecastPreview />
				<WeatherForecastPreview />
				<WeatherForecastPreview />
				<WeatherForecastPreview />
				<WeatherForecastPreview />
				<WeatherForecastPreview />
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	dailyForecastContainer: {},

	headlineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		marginLeft: 10,
		marginBottom: 10,
	},

	headlineText: {
		color: 'white',
	},
});

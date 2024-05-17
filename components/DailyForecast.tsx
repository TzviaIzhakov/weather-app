import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Weather } from '../types/weatherType';

import WeatherForecastPreview from './WeatherForecastPreview';

type DailyForecastProps = {
	currWeather: Weather;
};

// this is the component that display the daily forecast of the weather - i decided to display forecast for a week, it receives the currWeather prop from the home component
export default function DailyForecast({ currWeather }: DailyForecastProps) {
	return (
		<View style={styles.dailyForecastContainer}>
			<View style={styles.headlineContainer}>
				<CalendarDaysIcon size={22} color={'white'} />
				<Text style={styles.headlineText}>Daily forecast</Text>
			</View>

			<FlatList
				style={styles.weatherForecastList}
				data={currWeather?.forecast}
				renderItem={({ item }) => {
					//this is the component of forecast weather of one day
					return <WeatherForecastPreview forecast={item} />;
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => `${item.text}-${index}`}
				ItemSeparatorComponent={() => <View style={{ width: 1 }}></View>}
				ListEmptyComponent={() => <Text>No Items Found</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	dailyForecastContainer: {
		flex: 1,
		marginBottom: 40,
	},

	weatherForecastList: {
		flexDirection: 'row',
	},

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

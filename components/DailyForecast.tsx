import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Weather } from '../types/weatherType';

import WeatherForecastPreview from './WeatherForecastPreview';

type DailyForecastProps = {
	currWeather: Weather;
};

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
					return <WeatherForecastPreview forecast={item} />;
				}}
				horizontal
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

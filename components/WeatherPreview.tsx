import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { weatherUtils } from '../utils/weatherUtils';

import { Weather } from '../types/weatherType';

import sunImg from '../assets/images/sun.png';
import sunIcon from '../assets/icons/sun.png';
import windIcon from '../assets/icons/wind.png';
import dropIcon from '../assets/icons/drop.png';

type WeatherPreviewProps = {
	currWeather: Weather;
};

// this is the component that display the weather details, it receives the currWeather prop from the home component
export default function WeatherPreview({ currWeather }: WeatherPreviewProps) {
	return !currWeather ? (
		<ActivityIndicator size={50} color={'white'} animating={true} />
	) : (
		<View style={styles.weatherPreview}>
			<Text style={styles.city}>
				{`${currWeather.location.name}, ` || 'Ramla'}
				<Text style={styles.country}>{currWeather.location.country || 'Israel'}</Text>
			</Text>

			<Image source={sunImg} style={styles.sunImg} />

			<View style={styles.currentWeatherDetail}>
				<Text style={styles.currentTemp}>{currWeather.temp || 36}&#176;</Text>
				<Text style={styles.currentDay}>{weatherUtils.getCurrentDay() || 'Sunday'}</Text>
			</View>

			<View style={styles.conditionsContainer}>
				<View style={styles.condition}>
					<Image source={windIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>{currWeather.wind || 22} Km</Text>
				</View>

				<View style={styles.condition}>
					<Image source={dropIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>{currWeather.humidity || 5}%</Text>
				</View>

				<View style={styles.condition}>
					<Image source={sunIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>{weatherUtils.getHour(currWeather.location.localtime) || '00:00 AM'}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	weatherPreview: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		marginVertical: 25,
	},

	city: {
		fontSize: 20,
		fontWeight: '900',
		color: 'white',
	},

	country: {
		color: 'lightgray',
		fontSize: 16,
		fontWeight: '500',
	},

	sunImg: {
		width: 250,
		height: 250,
	},

	currentWeatherDetail: {
		alignItems: 'center',
	},

	currentTemp: {
		fontSize: 60,
		fontWeight: '900',
		color: 'white',
	},

	currentDay: {
		fontSize: 20,
		color: 'lightgray',
		marginBottom: 10,
	},

	conditionsContainer: {
		flexDirection: 'row',
		gap: 15,
		// marginBottom: 100,
	},

	condition: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},

	conditionIcon: {
		height: 20,
		width: 20,
	},

	conditionDetail: {
		fontSize: 20,
		color: 'white',
	},
});

import { Image, StyleSheet, Text, View } from 'react-native';

import { weatherUtils } from '../utils/weatherUtils';
import weatherConsts from '../constants/weatherConsts';

import SunnyImg from '../assets/images/sun.png';

export default function WeatherForecastPreview({ forecast }) {
	return (
		<View style={styles.weatherForecastPreview}>
			<Image source={weatherConsts[forecast.text] || SunnyImg} style={styles.conditionImg} />
			<Text style={styles.forecastDay}>{weatherUtils.getDay(forecast.day)}</Text>
			<Text style={styles.forecastTemp}>{forecast.temp}&#176;</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	weatherForecastPreview: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		backgroundColor: 'rgba(126, 160, 212, 0.15)',
		minWidth: 100,
		height: 100,
		marginRight: 15,
		padding: 10,
	},

	conditionImg: {
		width: 40,
		height: 40,
	},

	forecastDay: {
		color: 'white',
	},

	forecastTemp: {
		color: 'white',
		fontWeight: '900',
		fontSize: 20,
	},
});

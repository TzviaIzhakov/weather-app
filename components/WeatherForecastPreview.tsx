import { Image, StyleSheet, Text, View } from 'react-native';

import heavyRainImg from '../assets/images/heavyrain.png';

export default function WeatherForecastPreview() {
	return (
		<View style={styles.weatherForecastPreview}>
			<Image source={heavyRainImg} style={styles.conditionImg} />
			<Text style={styles.forecastDay}>Monday</Text>
			<Text style={styles.forecastTemp}>23&#176;</Text>
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

import { Image, StyleSheet, Text, View } from 'react-native';

import sunImg from '../assets/images/sun.png';
import sunIcon from '../assets/icons/sun.png';
import windIcon from '../assets/icons/wind.png';
import dropIcon from '../assets/icons/drop.png';

export default function WeatherPreview() {
	return (
		<View style={styles.weatherPreview}>
			<Text style={styles.city}>
				{`Islamabad, `}
				<Text style={styles.country}>Pakistan</Text>
			</Text>

			<Image source={sunImg} style={styles.sunImg} />

			<View style={styles.currentWeatherDetail}>
				<Text style={styles.currentTemp}>36.9&#176;</Text>
				<Text style={styles.currentDay}>Sunday</Text>
			</View>

			<View style={styles.conditionsContainer}>
				<View style={styles.condition}>
					<Image source={windIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>4.3km</Text>
				</View>

				<View style={styles.condition}>
					<Image source={dropIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>14%</Text>
				</View>

				<View style={styles.condition}>
					<Image source={sunIcon} style={styles.conditionIcon} />
					<Text style={styles.conditionDetail}>5:09 AM</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	weatherPreview: {
		alignItems: 'center',
	},

	city: {
		fontSize: 20,
		fontWeight: '900',
		color: 'white',
		marginBottom: 30,
	},

	country: {
		color: 'lightgray',
		fontSize: 16,
		fontWeight: '500',
	},

	sunImg: {
		width: 250,
		height: 250,
		marginBottom: 16,
	},

	currentWeatherDetail: {
		alignItems: 'center',
		marginBottom: 60,
	},

	currentTemp: {
		fontSize: 60,
		fontWeight: '900',
		color: 'white',
	},

	currentDay: {
		fontSize: 20,
		color: 'lightgray',
	},

	conditionsContainer: {
		flexDirection: 'row',
		gap: 15,
		marginBottom: 40,
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

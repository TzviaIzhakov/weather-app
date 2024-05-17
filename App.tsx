import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import WeatherContext from './contexts/WeatherContext';

import useWeather from './hooks/useWeather';

import Home from './screens/Home';

import backgroundImg from './assets/images/bg.png';

export default function App() {
	const weatherHandler = useWeather();

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.backgroundImag} source={backgroundImg} blurRadius={55} />
			<WeatherContext.Provider value={weatherHandler}>
				<Home />
			</WeatherContext.Provider>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	backgroundImag: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});

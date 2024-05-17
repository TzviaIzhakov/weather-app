import { Dimensions, ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import WeatherContext from './contexts/WeatherContext';

import useWeather from './hooks/useWeather';

import Home from './screens/Home';

import backgroundImg from './assets/images/bg.png';

const height = Dimensions.get('window').height;
export default function App() {
	// Define a variable weatherHandler and initialize it with the result of calling the useWeather() hook
	const weatherHandler = useWeather();

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.backgroundImag} source={backgroundImg} blurRadius={55} />
			{/* Provide the weatherHandler context to the Home component */}
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
		height,
		position: 'absolute',
	},
});

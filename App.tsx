import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';

import backgroundImg from './assets/images/bg.png';

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground style={styles.backgroundImag} source={backgroundImg} blurRadius={55} />
			<Home />
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

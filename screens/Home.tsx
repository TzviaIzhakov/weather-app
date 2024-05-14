import { useState } from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ImageBackground, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import backgroundImg from '../assets/images/bg.png';

export default function Home() {
	const [showSearch, setSearch] = useState(false);

	return (
		<View style={styles.homeContainer}>
			<StatusBar hidden={true} />
			<ImageBackground style={styles.backgroundImag} source={backgroundImg} blurRadius={55} />
			<KeyboardAvoidingView style={styles.inputContainer} behavior='height'>
				{showSearch ? <TextInput placeholder='Search City' style={styles.searchCityInput} placeholderTextColor='lightgray' /> : null}

				<TouchableOpacity style={styles.touchableOpacity} onPress={() => setSearch((prev) => !prev)}>
					<MagnifyingGlassIcon size={25} color='white' />
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
		position: 'relative',
	},

	backgroundImag: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},

	inputContainer: {
		height: '7%',
		marginHorizontal: 15,
	},

	searchCityInput: {
		paddingHorizontal: 25,
		paddingVertical: 15,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 25,
	},

	touchableOpacity: {
		backgroundColor: 'rgba(255,255,255,0.3)',
		padding: 15,
		borderRadius: 50,
		position: 'absolute',
		right: 5,
		top: 5,
		bottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

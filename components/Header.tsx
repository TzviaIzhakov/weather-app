import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import useWeather from '../hooks/useWeather';

export default function Header() {
	const [showSearch, setSearch] = useState(false);
	const { locations } = useWeather();

	function handleLocation() {}

	return (
		<KeyboardAvoidingView style={styles.inputContainer} behavior='height'>
			{showSearch ? <TextInput placeholder='Search City' style={styles.searchCityInput} placeholderTextColor='lightgray' /> : null}

			<TouchableOpacity style={styles.touchableOpacity} onPress={() => setSearch((prev) => !prev)}>
				<MagnifyingGlassIcon size={25} color='white' />
			</TouchableOpacity>

			{locations.length > 0 && showSearch && (
				<View style={styles.locationsContainer}>
					{locations?.map((location, index) => (
						<TouchableOpacity
							key={location}
							style={index + 1 !== locations.length ? [styles.location, styles.border] : styles.location}
							onPress={() => handleLocation()}
						>
							<MapPinIcon size={20} color={'gray'} />
							<Text style={styles.locationName}>{location}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		height: '7%',
		marginHorizontal: 15,
		marginBottom: 12,
	},

	searchCityInput: {
		paddingVertical: 15,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 25,
		paddingLeft: 20,
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

	locationsContainer: {
		position: 'absolute',
		backgroundColor: 'white',
		top: 60,
		width: '100%',
		borderRadius: 30,
		padding: 10,
	},

	location: {
		flexDirection: 'row',
		gap: 5,
		marginBottom: 1,
		padding: 10,
	},

	border: {
		borderColor: 'lightgray',
		borderBottomWidth: 2,
	},

	locationName: {
		fontSize: 18,
		marginLeft: 5,
	},
});

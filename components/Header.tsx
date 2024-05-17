import { debounce } from 'lodash';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { weatherService } from '../services/weatherService';

import { FilterBy } from '../types/weatherType';
import { Location } from '../types/weatherType';

type setFilterProps = {
	handleFilter: (filter: FilterBy) => void;
};

export default function Header({ handleFilter }: setFilterProps) {
	// city is the state of the text in the input search
	const [city, setCity] = useState('');
	// showSearch is a boolean state that is used to show the locations below the input
	const [showSearch, setSearch] = useState(false);
	// locations state is the array of the locations that need to appear below the input
	const [locations, setLocations] = useState<Location[]>([]);

	/* handleLocation function triggered when the user clicked on spesific location
	it uses the hanfleFilter props to change the global filter state, and changing the search state to be false and the text on the search bar to be empty*/
	function handleLocation(location: Location) {
		handleFilter({ txt: location.city, country: location.country });
		setSearch(false);
		setLocations([]);
		setCity('');
	}

	// the debounced function uses handleChange this function only when the user is typing more then 2 characters , it gets the location via the service and set the location state there, after i changed the state of the search to be true so that the user will see the location results
	async function handleChange(value: string) {
		if (value.length > 2) {
			const locations = await weatherService.queryLocations(value);
			setLocations(locations);
			setSearch(true);
		}
	}

	/* this is the function that is running while the user is typing in the search input,
	 i used intentionally debounce not to call every time to the weather api*/

	const handleTextDebounce = useCallback(debounce(handleChange, 1200), []);

	return (
		<KeyboardAvoidingView
			style={styles.inputContainer}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 75}
		>
			<StatusBar hidden={true} />
			<View>
				<TextInput
					placeholder='Search City'
					style={styles.searchCityInput}
					placeholderTextColor='lightgray'
					onChangeText={(value) => {
						handleTextDebounce(value);
						setCity(value);
					}}
					value={city}
				></TextInput>
				<View style={styles.searchIcon}>
					<MagnifyingGlassIcon size={25} color='white' />
				</View>
			</View>

			{locations.length > 0 && showSearch && (
				<View style={styles.locationsContainer}>
					<FlatList
						data={locations}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									key={`${item}-${index}`}
									style={index + 1 !== locations.length ? [styles.location, styles.border] : styles.location}
									onPress={() => handleLocation(item)}
								>
									<MapPinIcon size={20} color={'gray'} />
									<Text style={styles.locationName}>
										{item.city}, {item.country}
									</Text>
								</TouchableOpacity>
							);
						}}
						keyExtractor={(item, index) => `${item._id}-${index}`}
						ItemSeparatorComponent={() => <View style={{ width: 1 }}></View>}
						ListEmptyComponent={() => <Text>No Items Found</Text>}
					/>
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 15,
		marginBottom: 20,
		flex: 1,
	},

	searchCityInput: {
		paddingVertical: 15,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 25,
		paddingLeft: 20,
		color: 'white',
		marginBottom: 3,
	},

	searchIcon: {
		backgroundColor: 'rgba(255,255,255,0.3)',
		padding: 10,
		borderRadius: 50,
		position: 'absolute',
		right: 10,
		top: 7,
		alignItems: 'center',
		justifyContent: 'center',
	},

	locationsContainer: {
		backgroundColor: 'white',
		width: '100%',
		borderRadius: 30,
		padding: 10,
	},

	location: {
		flexDirection: 'row',
		alignItems: 'center',
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

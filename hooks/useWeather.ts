import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { weatherService } from '../services/weatherService';
import { Coordinates, FilterBy, Weather } from '../types/weatherType';

// this is the hook of weather, it returns the current weather fetched from the weather service, the current location detected by  expo location and the filterBy state
export default function useWeather() {
	// filterBy state represents the filter state which contains txt key and another optional key called country
	// the txt key represent the location that the user searched
	const [filterBy, setFilterBy] = useState<FilterBy>(weatherService.getDefaultFilter());
	// currWeather state represents the weather retrieved from the weather service
	const [currWeather, setCurrWeather] = useState<Weather | null>(null);
	// currLocation is the state represents the current location of the user
	const [currLocation, setCurrLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 });

	//loadCurrWeather function update the currWeather state by calling query function from service
	async function loadCurrWeather() {
		try {
			const { latitude, longitude } = currLocation;
			console.log(latitude, longitude);
			const weather = await weatherService.query(filterBy, latitude, longitude);
			setCurrWeather(weather);
		} catch (error) {
			throw new Error(`Error fetching weather:', ${error}`);
		}
	}

	//getLocation function updates currLocation state through calling Location from expo-location
	const getLocation = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				alert('Permission to access location was denied. Please enable location services in your device settings.');
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setCurrLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		} catch (error) {
			console.error(`Error fetching location: ${error}`);
			alert('Error fetching location. Make sure that location services are enabled and try again.');
		}
	};

	//when the app first rendered it will get the current location of the user
	useEffect(() => {
		getLocation();
	}, []);

	//when the current location of the user updated or the location that the user selected is updated the app will render again
	useEffect(() => {
		if (currLocation.latitude && currLocation.longitude) {
			loadCurrWeather();
		}
	}, [currLocation, filterBy]);

	return { currWeather, currLocation, setFilterBy, filterBy };
}

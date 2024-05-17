import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { weatherService } from '../services/weatherService';
import { Coordinates, FilterBy, Weather } from '../types/weatherType';

export default function useWeather() {
	const [filterBy, setFilterBy] = useState<FilterBy>(weatherService.getDefaultFilter());
	const [currLocation, setCurrLocation] = useState<Coordinates>({ latitude: 0, longitude: 0 });
	const [currWeather, setCurrWeather] = useState<Weather | null>(null);

	async function loadCurrWeather() {
		try {
			const { latitude, longitude } = currLocation;
			const weather = await weatherService.query(filterBy, latitude, longitude);
			setCurrWeather(weather);
		} catch (error) {
			throw new Error(`Error fetching weather:', ${error}`);
		}
	}

	async function getLocation() {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.error('Permission to access location was denied');
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setCurrLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});
		} catch (error) {
			throw new Error(`Error fetching location:', ${error}`);
		}
	}

	useEffect(() => {
		getLocation();
	}, []);

	useEffect(() => {
		loadCurrWeather();
	}, [currLocation, filterBy]);

	return { currWeather, currLocation, loadCurrWeather, setFilterBy, filterBy, setCurrLocation };
}

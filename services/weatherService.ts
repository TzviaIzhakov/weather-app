import axios from 'axios';

import { weatherUtils } from '../utils/weatherUtils';
import { storageService } from './async-storage.service';
import { Forecast, Location, Weather, WeatherMap } from '../types/weatherType';

export const weatherService = {
	get: getDefaultLocation,
	query,
	getDefaultFilter,
	queryLocations,
};

const STORAGE_KEY = 'WEATHERDB';

async function getDefaultLocation(latitude: number, longitude: number): Promise<Weather> {
	try {
		const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json}`, {
			params: {
				key: process.env.EXPO_PUBLIC_WEATHER_KEY,
				q: `${latitude},${longitude}`,
				aqi: 'no',
				days: 7,
			},
		});

		const weatherData = response.data;
		const weather = getFormattedPayload(weatherData);
		return weather;
	} catch (err) {
		throw new Error(`Failed to load weather: ${err}`);
	}
}

function getForecast(forecastday: any) {
	forecastday = forecastday.map((f: Forecast) => ({ day: f.date_epoch, text: f.day.condition.text, temp: f.day.avgtemp_c }));
	return forecastday;
}

function getFormattedPayload(weather: any): Weather {
	const { location, current, forecast } = weather;
	const { forecastday } = forecast;
	return {
		location: {
			country: location.country,
			name: location.name,
			localtime: location.localtime,
		},
		condition: {
			text: current.condition.text,
			icon: current.condition.icon,
		},
		temp: current.temp_c,
		humidity: current.humidity,
		wind: current.wind_kph,
		forecast: getForecast(forecastday),
	};
}

async function query(filterBy = { txt: '', country: '' }, latitude: number, longitude: number): Promise<Weather> {
	try {
		let fetchedWeather;
		const dayTimeStamp = weatherUtils.getCurrentDayTimestamp();
		let storedWeathers: WeatherMap = (await storageService.query(STORAGE_KEY)) || {};

		if (Object.keys(storedWeathers).length !== 0 && storedWeathers[dayTimeStamp] && filterBy.txt === '') {
			return storedWeathers[dayTimeStamp][0];
		} else if (filterBy.txt === '') {
			storedWeathers[dayTimeStamp] = [];
			fetchedWeather = await getDefaultLocation(latitude, longitude);
		} else {
			const regex1 = new RegExp(filterBy.txt, 'i');
			const regex2 = new RegExp(filterBy.country, 'i');
			const existingWeather = storedWeathers[dayTimeStamp].find((w) => regex1.test(w.location.name) && regex2.test(w.location.country));

			if (existingWeather) {
				return existingWeather;
			}

			const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
				params: {
					key: process.env.EXPO_PUBLIC_WEATHER_KEY,
					days: 7,
					q: filterBy.txt,
					aqi: 'no',
				},
			});

			fetchedWeather = getFormattedPayload(res.data);
		}

		storedWeathers[dayTimeStamp].push(fetchedWeather);

		await storageService.saveToStorage(STORAGE_KEY, storedWeathers);
		return fetchedWeather;
	} catch (error) {
		throw new Error(`Failed to load weather: ${error}`);
	}
}

async function queryLocations(text: string): Promise<Location[]> {
	try {
		const res = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${process.env.EXPO_PUBLIC_WEATHER_KEY}&q=${text}`);
		return res.data.map((location: any) => ({ country: location.country, city: location.name, _id: location.id }));
	} catch (err) {
		throw new Error(`can not fetch locations, ${err}`);
	}
}

function getDefaultFilter() {
	return { txt: '' };
}

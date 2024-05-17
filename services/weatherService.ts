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

//getForecast returns a formatted array of daily forecast weather
function getForecast(forecastday: any): Forecast[] {
	forecastday = forecastday.map((f: any) => ({ day: f.date_epoch, text: f.day.condition.text, temp: f.day.avgtemp_c }));
	return forecastday;
}

//getFormattedPayload return a formatted weather
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

// getDefaultLocation returns the current location of the user using is latitude and longitude
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

//query function returns the current weather  from cache or from the api
async function query(filterBy = { txt: '', country: '' }, latitude: number, longitude: number): Promise<Weather> {
	try {
		// dayTimeStamp is the timestamp of the current day when the hour is 12PM
		const dayTimeStamp = weatherUtils.getCurrentDayTimestamp();
		// storedWeathers is the stored data in the storage : {[day:number] : Weather[]}
		let storedWeathers: WeatherMap = (await storageService.query(STORAGE_KEY)) || {};

		if (filterBy.txt === '') {
			// If no filter is applied and stored weather data exists for the current day, return the first entry which represents also the location of the user
			if (storedWeathers[dayTimeStamp]?.length > 0) {
				return storedWeathers[dayTimeStamp][0];
			}

			// If no filter is applied and no stored data exists, fetch default location weather
			storedWeathers[dayTimeStamp] = [];
			//fetch the current weather with the current location of the user
			const fetchedWeather = await getDefaultLocation(latitude, longitude);
			//pushing the current weather to the storedWeathers[dayTimeStamp] array
			storedWeathers[dayTimeStamp].push(fetchedWeather);
			//storing it in the storage
			await storageService.saveToStorage(STORAGE_KEY, storedWeathers);
			return fetchedWeather;
		}
		// If  filter is applied there is an option that the user searched again a city name, this is checked by the country also
		const regex1 = new RegExp(filterBy.txt, 'i');
		const regex2 = new RegExp(filterBy.country, 'i');
		const existingWeather = storedWeathers[dayTimeStamp]?.find((w) => regex1.test(w.location.name) && regex2.test(w.location.country));
		//returns the existingWeather from storage if the country ia in the storage
		if (existingWeather) {
			return existingWeather;
		}
		//if the weather doesn't stored in the storage the servuce will call to the api with the location the user searched
		const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
			params: {
				key: process.env.EXPO_PUBLIC_WEATHER_KEY,
				days: 7,
				q: filterBy.txt,
				aqi: 'no',
			},
		});
		// fetchedWeather is the weather object with specific keys that needed
		const fetchedWeather = getFormattedPayload(res.data);
		storedWeathers[dayTimeStamp] = storedWeathers[dayTimeStamp] || [];
		storedWeathers[dayTimeStamp].push(fetchedWeather);
		//putting the weather in the storge
		await storageService.saveToStorage(STORAGE_KEY, storedWeathers);
		return fetchedWeather;
	} catch (error) {
		throw new Error(`Failed to load weather: ${error}`);
	}
}

//queryLocations function return  the results of the locations that the user searched for, it uses the api endpoint
async function queryLocations(text: string): Promise<Location[]> {
	try {
		const res = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${process.env.EXPO_PUBLIC_WEATHER_KEY}&q=${text}`);
		return res.data.map((location: any) => ({ country: location.country, city: location.name, _id: location.id }));
	} catch (err) {
		throw new Error(`can not fetch locations, ${err}`);
	}
}

//this function returns the default filter
function getDefaultFilter() {
	return { txt: '', county: '' };
}

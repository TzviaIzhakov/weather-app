import { createContext } from 'react';

import { Coordinates, FilterBy, Weather } from '../types/weatherType';

interface WeatherContextType {
	currWeather: Weather | null;
	currLocation: Coordinates;
	setFilterBy: (filterBy: FilterBy) => void;
	filterBy: FilterBy;
}

const WeatherContext = createContext<WeatherContextType>({
	currWeather: {
		location: {
			country: '',
			name: '',
			localtime: '',
		},
		condition: {
			text: '',
			icon: '',
		},
		temp: 0,
		humidity: 0,
		wind: 0,
		forecast: [],
	},

	currLocation: { latitude: 0, longitude: 0 },
	setFilterBy: () => {},
	filterBy: { txt: '' },
});

export default WeatherContext;

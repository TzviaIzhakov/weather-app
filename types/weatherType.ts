export type Weather = {
	location: {
		country: string;
		name: string;
		localtime: string;
	};
	condition: {
		text: string;
		icon: string;
	};

	temp: number;
	humidity: number;
	wind: number;

	forecast: Forecast[];
};

export type Forecast = {
	day: number;
	temp: number;
	text: string;
};

export type Coordinates = {
	latitude: number;
	longitude: number;
};

export type WeatherMap = {
	[day: number]: Weather[];
};

export type FilterBy = {
	txt: string;
	country?: string;
};

export type Location = {
	country: string;
	city: string;
	lat: number;
	lon: number;
	_id: number;
};

export type WeatherConsts = {
	[key: string]: any;
};

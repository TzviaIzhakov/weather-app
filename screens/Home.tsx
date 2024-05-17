import { FlatList, Platform, StyleSheet } from 'react-native';

import useWeather from '../hooks/useWeather';

import { FilterBy } from '../types/weatherType';

import Header from '../components/Header';
import DailyForecast from '../components/DailyForecast';
import WeatherPreview from '../components/WeatherPreview';

export default function Home() {
	const { currWeather, setFilterBy } = useWeather();

	function handleFilter(filter: FilterBy) {
		setFilterBy(filter);
	}

	const components = [
		{ cmpName: 'header', component: 'Header' },
		{ cmpName: 'weatherPreview', component: 'WeatherPreview' },
		{ cmpName: 'dailyForecast', component: 'DailyForecast' },
	];

	const renderItem = ({ item }) => {
		switch (item.component) {
			case 'Header':
				return <Header handleFilter={handleFilter} />;
			case 'WeatherPreview':
				return <WeatherPreview currWeather={currWeather} />;
			case 'DailyForecast':
				return <DailyForecast currWeather={currWeather} />;
			default:
				return null;
		}
	};

	return <FlatList style={styles.homeContainer} data={components} renderItem={renderItem} keyExtractor={(item) => item.cmpName} />;
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 15 : 0,
		position: 'relative',
		marginHorizontal: 8,
	},
});

import { useEffect, useState } from 'react';

export default function useWeather() {
	const [locations, setLocations] = useState<string[]>([]);

	function loadLocations() {
		setLocations(['Israel', 'Japan', 'Italy']);
	}

	useEffect(() => {
		loadLocations();
	}, []);

	return { locations };
}

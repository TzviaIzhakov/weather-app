import AsyncStorage from '@react-native-async-storage/async-storage';
export const storageService = {
	query,
	loadFromStorage,
	saveToStorage,
};

async function query<T>(entityType: string): Promise<{ [key: string]: T }> {
	try {
		const result = await AsyncStorage.getItem(`@MyStorage:${entityType}`);
		const entities = result ? JSON.parse(result) : {};
		return entities;
	} catch (error) {
		console.error('Error querying storage:', error);
		throw error;
	}
}

async function saveToStorage<T>(entityType: string, entities: { [key: string]: T }) {
	await AsyncStorage.setItem(`@MyStorage:${entityType}`, JSON.stringify(entities));
}

async function loadFromStorage<T>(entityType: string): Promise<T | null> {
	const value = await AsyncStorage.getItem(entityType);
	return value ? (JSON.parse(value) as T) : null;
}

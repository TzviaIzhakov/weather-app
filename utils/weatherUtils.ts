export const weatherUtils = {
	getDay,
	getHour,
	getCurrentDay,
	getCurrentDayTimestamp,
};

function getCurrentDayTimestamp() {
	const currDate = new Date();
	currDate.setHours(0, 0, 0, 0);
	return currDate.getTime();
}

function getCurrentDay() {
	// Create a new Date object to get the current date
	const currentDate = new Date();

	// Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
	const currentDayIndex = currentDate.getDay();

	// Define an array of day names
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// Return the name of the current day
	return daysOfWeek[currentDayIndex];
}

function getHour(localtime: string) {
	const hour = localtime.split(' ')[1];
	if (Number(hour.split(':')[0]) > 12) {
		return hour + ' PM';
	}
	return hour + ' AM';
}

function getDay(epochTime: number) {
	const date = new Date(epochTime * 1000); // Convert to milliseconds
	const dayIndex = date.getUTCDay(); // Get the day of the week as an index (0-6)
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayName = daysOfWeek[dayIndex]; // Get the day name from the array
	return dayName;
}

import heavyRainImg from '../assets/images/heavyrain.png';
import moderateRainImg from '../assets/images/moderaterain.png';
import partlyCloudyImg from '../assets/images/partlycloudy.png';
import sunImg from '../assets/images/sun.png';
import cloudImg from '../assets/images/cloud.png';

const weatherConsts = {
	'Partly cloudy': partlyCloudyImg,
	'Patchy rain nearby': partlyCloudyImg,
	'Moderate rain': moderateRainImg,
	'Patchy rain possible': moderateRainImg,
	Sunny: sunImg,
	Clear: sunImg,
	Overcast: cloudImg,
	Cloudy: cloudImg,
	'Light rain': moderateRainImg,
	'Moderate rain at times': moderateRainImg,
	'Heavy rain': heavyRainImg,
	'Heavy rain at times': heavyRainImg,
	'Moderate or heavy freezing rain': heavyRainImg,
	'Moderate or heavy rain shower': heavyRainImg,
	'Moderate or heavy rain shower with thunder': heavyRainImg,
	Fog: cloudImg,
	other: moderateRainImg,
};

export default weatherConsts;



export const getImageBackgroundSrc = (weatherName) => {
    let listWeather = {
        'Clear': require('./../../assets/weatherbg/Clear.gif'), //Clear
        'Cloudy': require('./../../assets/weatherbg/cloudy.gif'), //snow
        'Light rain': require('./../../assets/weatherbg/Light rain shower.gif'), //Sleet
        'Shower': require('./../../assets/weatherbg/Light rain shower.gif'), //Sleet
        'Light': require('./../../assets/weatherbg/Light.gif'), //Sleet
        'Mist': require('./../../assets/weatherbg/Mist.gif'), // Mis

        'Moderate': require('./../../assets/weatherbg/Moderate or heavy rain shower.gif'), //Sleet
        'Heavy rain shower': require('./../../assets/weatherbg/Moderate or heavy rain shower1.gif'), //Sleet
        'Overcast': require('./../../assets/weatherbg/Overcast.gif'), //Showers
        'Partly cloudy': require('./../../assets/weatherbg/Partly cloudy.gif'), //Heavy Cloud
        'Patchy light drizzle': require('./../../assets/weatherbg/Patchy light drizzle.gif'), //Hail
        'Patchy rain possible': require('./../../assets/weatherbg/Patchy rain possible.gif'), //Hail
        'Snow': require('./../../assets/weatherbg/Snow.gif'), //Hail
        'Sunny': require('./../../assets/weatherbg/Sunny.gif'), //Light Cloud
        
    };

    return listWeather[weatherName];
}
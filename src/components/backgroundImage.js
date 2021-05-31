





export const getImageBackgroundSrc = (weatherName) => {
    let listWeather = {
        'sn': require('./../../assets/weather/sn.jpg'), //snow
        'sl': require('./../../assets/weather/sl.jpg'), //Sleet
        'h': require('./../../assets/weather/h.jpg'), //Hail
        't': require('./../../assets/weather/t.jpg'), //Thunderstorm
        'hr': require('./../../assets/weather/hr.jpg'), //Heavy Rain
        'lr': require('./../../assets/weather/lr.gif'), //Light Rain
        's': require('./../../assets/weather/s.gif'), //Showers
        'hc': require('./../../assets/weather/h.jpg'), //Heavy Cloud
        'lc': require('./../../assets/weather/lc.gif'), //Light Cloud
        'Clear': require('./../../assets/weather/c.gif'), //Clear

        // 'sn': './../../assets/weather/sn.jpg', //snow
        // 'sl': './../../assets/weather/sl.jpg', //Sleet
        // 'h': './../../assets/weather/h.jpg', //Hail
        // 't': './../../assets/weather/t.jpg', //Thunderstorm
        // 'hr': './../../assets/weather/hr.jpg', //Heavy Rain
        // 'lr': './../../assets/weather/lr.gif', //Light Rain
        // 's': './../../assets/weather/s.gif', //Showers
        // 'hc': './../../assets/weather/h.jpg', //Heavy Cloud
        // 'lc': './../../assets/weather/lc.gif', //Light Cloud
        // 'Clear': './../../assets/weather/c.gif', //Clear
    };

    return listWeather[weatherName];
}
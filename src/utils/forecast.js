const axios  = require('axios');

const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=26d68f8b3fbe018102cc54a1950b0dab&query=${long},${lat}`;

    axios.get(url).then(response => {
        
        const data = response.data.current; 
        callback(undefined,`Its currently ${data.temperature} *celcius but it feels like ${data.feelslike} and the weather is  ${data.weather_descriptions}`)
    }).catch(error=>callback(error.message,undefined))
}



module.exports = forecast;
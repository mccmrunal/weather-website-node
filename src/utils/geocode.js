
const axios  = require('axios');

const geocode = (address,callback) =>{
  
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWNjbXJ1bmFsIiwiYSI6ImNremU2Ym8zaDJmZDMybm45dm5pNjV5ajMifQ.Xicw6An38kQjgtTRjo51_Q&limit=1`
    axios.get(url)
    .then(({data})=>{
        if(data){
            const lat  =data.features[0].center[0];
            const long = data.features[0].center[1];
            const place = data.features[0].place_name;
            callback(undefined,{lat,long,place});
        }
        else
            callback('unable to find locations try something better','')
    }).catch(error=>callback(error.message,undefined))
}


module.exports = geocode;
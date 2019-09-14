const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFya3RhcnJhbnQiLCJhIjoiY2p3NmdsODA2MDRrMTQ5cWhtb3JsaG1zNyJ9.vFSAfspmRfr1upako2z0sA'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            //passes the error to the callback function below
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search')
        } else {
            //stated undefined as first expected value is for the error, however there is no error here
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
const request = require('request')//makes reference to the request npm library which allows you to make HTTP requests

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/90340698c7b2c4e75bfcb07c6b89ac04/' + latitude + ',' + longitude + '?units=uk2'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            //passes the error to the callback function below
            callback('Unable to connect to weather services')
        } else if (body.error) {
            callback('Unable to find location, try another search')
        } else {
            //stated undefined as first expected value is for the error, however there is no error here
            callback(undefined, body.daily.data[0].summary + " It is currently " +  body.currently.temperature + " degrees out. There is a " + (body.daily.data[0].precipProbability * 100) + "% chance of rain throughout the day. Today, expect a maximum temperature of " + body.daily.data[0].temperatureHigh + " and a low of " + body.daily.data[0].temperatureLow + ".")
        }
    })
}

module.exports = forecast
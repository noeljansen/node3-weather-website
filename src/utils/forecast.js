//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ffbb2be4010ab5a5f24229995e889106/' + encodeURIComponent(latitude) + ', ' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the forecast services!')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain. The minimum temperature is ' + body.daily.data[0].temperatureMin + " and the maximum temperature is " + body.daily.data[0].temperatureMax + ".")
        }
    })
}

module.exports = forecast
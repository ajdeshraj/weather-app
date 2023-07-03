request = require('request')

const weatherURL = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERKEY

const forecast = (latitude, longitude, callback) => {
    const url = weatherURL + '&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather Services!', undefined)
        }
        else if (body.error) {
            callback(body.error.code + ': ' + body.error.info, undefined)
        }
        else {
            const data = {
                description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelsLike: body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast

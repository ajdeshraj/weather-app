request = require('request')

const env = require('./env.js')

const forecast = (latitude, longitude, callback) => {
    const url = env.weather_url + '&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
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

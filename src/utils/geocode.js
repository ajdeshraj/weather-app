request = require('request')

const env = require('./env.js')

const geocode = (address, callback) => {
    const url = env.location_url + '&query=' + encodeURIComponent(address)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Location Services', undefined)
        }
        else if (!body.data[0]) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else if (body.error) {
            callback(body.error.code + ': ' + body.error.context.query.message)
        }
        else {
            const data = {
                label: body.data[0].label,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=09ce173397512309309ada28fbdf744a&query='+latitude + ',' + longitude+ '&units=m'
    //usamos shorthand porque el nombre url es igual a la variable
    // cambiamos response y colocamos {body} para hacer destructuring
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature +
            ' degress out. It feels like ' + body.current.feelslike + ' degress out. The humidity is ' + body.current.humidity + '%.')
        }
    }) 
}

module.exports = forecast
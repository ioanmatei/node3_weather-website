const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=92a5eac013cb62d1da947b873b9df00f&query=${lat},${long}`;
  request({url, json: true}, (error, { body }) => {
    const {feelslike, temperature, humidity} = body.current;
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location.');
    } else {
      callback(null, `It is currently ${temperature} degress out. It feels like ${feelslike} degress out. The humidity is ${humidity}%.`)
      }
  })
}

module.exports = forecast;
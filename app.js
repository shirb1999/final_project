const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const myLocation=process.argv[2]
if(!myLocation){
    console.log('you didnt provide a location. try again.')
}else{
         geocode(myLocation, (error, {latitude,longitude,location}) => {
        if(error){
            return console.log(error)
        }
        
             forecast(location, (error, forcData) => {
            if(error){
                return console.log(error)
            }
            console.log("DATA: ", location)
             console.log("FORECAST: ", forcData)
        })
    })
}


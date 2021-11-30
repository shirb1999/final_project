const request=require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiOTk5YnJva29saSIsImEiOiJja2ZxbnQzbXgwbW04MnZwNnhhd3U1cmN1In0.XLU1uBXFyOfo0juHrRfEZQ&limit=1'
         request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to web services', undefined)
        } else if (body.features.length == 0) {
            // console.log("################ unable to find location")
            callback('unable to find location', "unable")
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name,

            })

        }
    })
}
module.exports=geocode
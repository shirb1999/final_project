const request = require('request')

const requestApi = (city,cnt=96) => {
    return new Promise((reslove, reject) => {
      let options = {
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=${cnt}&units=metric&appid=5b35f44a2d2e2044f6e44e51acc42872`,
        // url: `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&units=metric&appid=f4d9d5870725fbd961ae8e7c52d133f5`,
      };
      request(options, function (err, res, body) {
        if (err) {
          reject(err);
        } else {
          reslove(body);
        }
      });
    });
  };






const forecast = (city, callback) => {
    requestApi(city)
      .then((data) => {
        const w = JSON.parse(data);//ממיר את הנתונים שחזרו מהאתר בג'ייסון לאובייקט גאווה סקריפט 
        // const currentweather = new Weather({
        let temp =  w.main.temp;
        let feels_like = w.main.feels_like;
        //   temp_min: w.main.temp_min,
        //   temp_max: w.main.temp_max,
        //   pressure: w.main.pressure,
        //   humidity: w.main.humidity,
        //   wind_speed: w.wind.speed,
        //   wind_deg: w.wind.deg,
        //   userId: req.params.id,
        // });
        console.log(temp, feels_like);
            callback(undefined, "weather descriptions:  "+temp)

        
    })
}

module.exports = forecast
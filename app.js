const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
})

app.post('/', function(req, res){
  const query =req.body.cityName;
  const apiKey='e604c32bbb3c0e83b9b68146de8089b9';
  const unit='metric';

  const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units='+unit;
  https.get(url, function(response){
    response.on('data', function(data){
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const tem=weatherData.main.temp;
      const weatherDesc= weatherData.weather[0].description;
      const icon =weatherData.weather[0].icon;
      const image='http://openweathermap.org/img/wn/'+icon+'@2x.png';
      res.write('<p>weather description' +weatherDesc+'</p>');
      res.write('<h1>Current temp '+query+'is '+tem+'</h1>');
      res.write('<img src='+image+' >')
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log('sever started on port 3000');
})

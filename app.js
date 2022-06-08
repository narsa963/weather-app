const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');
const books = [
  {id: 1 , name : "test1"},
  {id: 2 , name : "test2"}
]
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/books', function(req, res){
  res.json(books);
  res.send();
})

app.post('/add', bodyParser.json(),function(req,res){
  const bookname = req.body;
  books.push(bookname);
  res.json(books);
  console.log(bookname);
  res.send();
})
app.delete('/books/:id', function(req, res){
  console.log(books);
  const  delteBooks= books.filter(b =>b.id !=req.params.id );
  console.log(req.params.id);
  res.json(delteBooks);
  res.send();
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
      //res.write('<p>weather description' +weatherDesc+'</p>');
      //res.write('<h1>Current temp '+query+'is '+tem+'</h1>');
      //res.write('<img src='+image+' >')
      //res.write(weatherData);
      res.json(weatherData)
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log('sever started on port 3000');
})

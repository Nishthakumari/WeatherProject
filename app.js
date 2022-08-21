const express= require("express");
const { STATUS_CODES } = require("http");
const app= express();
const https= require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
    res.sendFile(__dirname  + "/index.html");
})

app.post("/", function(req, res)
{
    const query =  req.body.cityName;
    const apiKey = "8be0f3ca418e441cd731f5d433ac0bb7";
    const unit = "metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response)
    {
        console.log(response.statusCode);
        response.on("data", function(data)
        {
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<p>The weather is currently "+ description + "</p>");
            res.write("<h1>The temperature in "+ query + " is " +  temp + " degree Celcuis </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
    })


})
})





app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});

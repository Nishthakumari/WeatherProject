const express= require("express");
const app= express();
const https= require("https");


app.get("/", function(req, res)
{
    const url= "https://api.openweathermap.org/data/2.5/weather?q=London&appid=8be0f3ca418e441cd731f5d433ac0bb7";
    https.get(url, function(response)
    {
        console.log(response);
    })
    res.send("Server is up and running");
})

app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});

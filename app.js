const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
    const cityname = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname + "&units=metric&appid=03a0edec24dc8f2a0dc88d967224aae8"
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data) {
          const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp
          res.send(cityname + " weather is  " + temp)
        })
    })
    
})

 
app.listen("3000", function() {
    console.log("server is running!!!")
})
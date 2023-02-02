const { application } = require('express')
const express = require('express')
const fetch = require('node-fetch')
const Datastore = require('nedb')
require('dotenv').config()
const app = express()
// TODO: Make port dynamic
const port = process.env.PORT || 3000


app.listen(port, ()=>{
   console.log(`App started on 127.0.0.1:${port}`)
})

app.use(express.static('public'))
app.use(express.json({
    limit:'30mb'
}))

const database = new Datastore('database/database.db')
database.loadDatabase()

app.post('/api', (req,res)=>{
    const data = req.body
    console.log(data)
    data.timestamp = Date.now()
    database.insert(data)
    data.success = true
    res.json(data)
})

app.get('/api', (req,res)=>{
    //Get data from DB

    database.find({}, (err,data)=>{
        if(err){
            console.error(err)
        }else{
            res.json(data)
        }
    })
})

app.get('/weather/:latlon',async (req,res)=>{
    const latlon = req.params.latlon.split(',')
    console.log(latlon)

    // TODO: AQI Request

    const aqi_key = process.env.API_KEY_AQI
    const aqi_url = `https://api.waqi.info/feed/geo:${latlon[0]};${latlon[1]}/?token=${aqi_key}`
    
    const aqi_response = await fetch(aqi_url)
    const aqi_data = await aqi_response.json()


    const weather_key = process.env.API_KEY_WEATHER
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${weather_key}&units=metric`

    const weatherResponse = await fetch(weather_url)
    const weatherData = await weatherResponse.json()



    const data = {
        weather: weatherData,
        aqi: aqi_data.data.aqi
    }

    res.json(data)

})
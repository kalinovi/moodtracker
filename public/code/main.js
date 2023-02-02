function setup(){
    //disable canvas
    noCanvas()

    //Video Capture

    const video = createCapture()
    video.parent('main-container')
    video.size(320, 240)



let lan, lon, temp, description, aqi

//TODO: AQI


// Navigator is an object with client data in the browser
if('geolocation' in navigator){

    try {

        navigator.geolocation.getCurrentPosition(async position => {
            lat= position.coords.latitude
            lon= position.coords.longitude
    
            const response = await fetch (`/weather/${lat},${lon}`)
            const data = await response.json()
        
        
            console.log(data)
        })

    

    } catch(error) {

        console.error(error)
    }

    navigator.geolocation.getCurrentPosition(async position => {
        lat= position.coords.latitude
        lon= position.coords.longitude

        const response = await fetch (`/weather/${lat},${lon}`)
        const data = await response.json()

        //create template for data

        temp = data.weather.main.temp
        description = data.weather.weather[0],description
        aqi= data.aqi

        const template = `
        <div class="more-info">
            <div>${temp}</div>
            <div>${description}</div>
            div>${aqi}</div>

        </div>
        `

        const weatherDiv = document.createElement('div')
        weatherDiv.innerHTML = template

        document.querySelector('#main-container').append(weatherDiv)


    })
} else {
    console.error('Browser does not Support Geolocation')
}

document.querySelector('form button').addEventListener('click', async (e) =>{
    e.preventDefault()

    const mood = document.querySelector('#mood').value

    // Get image as base64 

    video.loadPixels()
    const image64= video.canvas.toDataURL()

    // TODO: ADD AQI DATA
    const data = {
        mood,
        temp,
        description,
        aqi,
        image64
        
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

    }

     response = await fetch('/api', options)
     const json = await response.json()

     console.log(json)
})
}
getData()
async function getData(){
    const response = await fetch('/api')
    const data = await response.json()

    console.log(data)

    data.forEach(mood => {
        
        var moodtrack = document.createElement('div') 
        
        const template =  `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p>${mood.aqi}</p>
        <img src="${mood.image64}" alt="">

        `

        if (mood.aqi <= 50){
            const template =  `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p style="color:greenyellow;">${mood.aqi}</p>
        <img src="${mood.image64}" alt="">
    
        `
        moodtrack.innerHTML = template

        document.querySelector('.moods').appendChild(moodtrack)
        }
        
        if (mood.aqi >= 51 && mood.aqi<=100){
            const template =  
            `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p style="color:orange;">${mood.aqi}</p>
        <img src="${mood.image64}" alt="">
        `
        moodtrack.innerHTML = template

        document.querySelector('.moods').appendChild(moodtrack)
    }

        if (mood.aqi >= 101 && mood.aqi <=200){
            const template =  
            `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p style="color:red;">${mood.aqi}</p>
        <img src="${mood.image64}" alt="">
        `
        moodtrack.innerHTML = template

        document.querySelector('.moods').appendChild(moodtrack)
    }

        if (mood.aqi >= 201 && mood.aqi  <=300){
            const template =  
            `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p style="color:purple;">${mood.aqi}</p>
        <img src="${mood.image64}" alt="">
        `
        moodtrack.innerHTML = template

        document.querySelector('.moods').appendChild(moodtrack)}

        if (mood.aqi >= 301  ){
            const template =  
            `<h1>${mood.mood}</h1>
        <p>${mood.temp}</p>
        <p>${mood.description}</p>
        <p style="color:brown;">${mood.aqi}</p>
        <img src="${mood.image64}" alt="">
        `
        moodtrack.innerHTML = template

        document.querySelector('.moods').appendChild(moodtrack)}

        
        // moodtrack.innerHTML = template

        // document.querySelector('.moods').appendChild(moodtrack)
       
    })

}


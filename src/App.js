import React, { useState } from 'react';

const url = 'http://api.weatherstack.com/current?access_key=4f8356019d1d6d5b96e3dde9df5857f3&query='


function App(){

    const [location, setLocation] = useState({})
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [err, setErr] = useState('')

    const search = (e) => {
      if(e.key === 'Enter'){
        if(query){
          fetch(`${url}${query}`)
          .then(res => res.json())
          .then((result) => {
             if(!result.error){
              setQuery('');
              setLocation(result.request);
              setWeather(result.current);
              console.log(result);     
             } else{
              setErr('Ran into a problem. Please try after sometime..')
               console.log("error")
             }
                         
          })
        }

      }
    }

    const dateFinder = (d) => {
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
                  'Thursday', 'Friday', 'Saturday']
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December']
      const date = d.getDate();
      const day = days[d.getDay()]
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day}, ${date} ${month} ${year} `
    }

    return (
      <div className={
        (!err)
        ? (weather.temperature < 16) 
           ? 'app-cold' 
           : 'app' 
        : 'app'
      }>
        <main>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search Location.." 
              className = "search-bar"
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div> 
          
          {(typeof weather.temperature != 'undefined') ? (
            <div>
              <div className="location-box">
                 <div className="location">{location.query}</div>
                 <div className="date">{dateFinder(new Date())}</div>
            
              </div>
              <div className="weather-box">
                <div className="temperature">{weather.temperature}°C</div>
                <div className="description">{weather.weather_descriptions}</div>
              </div>
            </div>
          ) : (<div className="error">{err}</div>)}

        </main>       
      </div>
    )
}


export default App;
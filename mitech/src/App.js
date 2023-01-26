import React, { useState } from "react";
import "./index.css"

const api = {
  key: "ead70af64f04ef021b07de24c4188994",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  }


  const dateBuilder = (f) => {
    let months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentiyabr", "Oktiyabr", "Noyabr", "Dekabr"];
    let days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

    let day = days[f.getDay()];
    let date = f.getDate();
    let month = months[f.getMonth()];
    let year = f.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'App summer' : 'App') : 'App'
      }>
      <main>
        <div className="search_box">
          <input type="text" className="search_bar" placeholder="Qidirish..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className="location_box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
            <div className="weather_box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;

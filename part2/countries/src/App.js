import "./App.css";
import Filter from "./components/Filter";
import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import Countries from "./components/Countries";

const Display = ({ countries, setInput, wind, weather, icon }) => {
  const objects = {
    0: <div>Too many matches, specify another filter</div>,
    1: (
      <Country
        country={countries[0]}
        wind={wind}
        weather={weather}
        icon={icon}
      />
    ),
    2: <Countries countries={countries} setInput={setInput} />,
  };
  if (countries.length > 10) {
    return objects[0];
  } else if (countries.length === 1) {
    return objects[1];
  } else {
    return objects[2];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toUpperCase().includes(input.toUpperCase())
  );
  const [weather, setWeather] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  const resetWindAndWeather = () => {
    setWeather(null);
    setWind(null);
    setIcon(null);
  };

  const handleInputChange = (e) => {
    setInput(e.currentTarget.value);
    resetWindAndWeather();
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });

    if (filteredCountries.length === 1 && !weather && !wind) {
      let [lat, lon] = filteredCountries[0].latlng;
      const api_key = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        )
        .then((response) => {
          setWind(response.data.wind.speed);
          setWeather(response.data.main.temp);
          setIcon(response.data.weather[0].icon);
        })
        .catch(() => {});
    }
  }, [filteredCountries, weather, wind]);

  return (
    <div className="App">
      <Filter input={input} setInput={handleInputChange} />
      <Display
        countries={filteredCountries}
        setInput={setInput}
        weather={weather}
        wind={wind}
        icon={icon}
      />
    </div>
  );
}

export default App;

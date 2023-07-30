const Country = ({ country, wind, weather, icon }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
      </div>
      <h3>Languages:</h3>
      <div>
        {languages.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </div>
      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`}></img>
      </div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature : {weather} Kelvin</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={icon} />
      <p>Wind: {wind} m/s</p>
    </div>
  );
};

export default Country;

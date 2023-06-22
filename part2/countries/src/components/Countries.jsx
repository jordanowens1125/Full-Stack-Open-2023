const Countries = ({ countries, setInput }) => {
  return (
    <div>
      {countries.map((country, id) => (
        <div key={id}>
          {country.name.common}{" "}
          <button onClick={() => setInput(country.name.common)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;

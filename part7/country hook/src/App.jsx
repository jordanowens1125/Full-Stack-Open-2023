import { useState } from "react";
import "./App.css";
import useCountry from "./hooks/useCountry";
import useField from "./hooks/useField";
import Country from "./components/Country";

function App() {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const results =
    searchInput === ""
      ? persons
      : persons.filter((person) => {
          const name = person.name.toLowerCase();
          return name.includes(searchInput.toLowerCase());
        });

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  },[])
  
  const createPerson = (e) => {
    e.preventDefault();

    const userInList = persons.filter((person) => person.name === newName);

    if (userInList.length <= 0) {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
        })
      );
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInput={searchInput} setSearchInput={setSearchInput} />
      <h3>Add a new</h3>
      <PersonForm
        createPerson={createPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      {}
      <Persons persons={results} />
    </div>
  );
}

export default App;

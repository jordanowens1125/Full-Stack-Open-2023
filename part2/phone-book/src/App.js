import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsServices from "./services/persons";

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
    personsServices.getAll().then((response) => setPersons(response));
  }, []);

  const resetValues = () => {
    setNewName("");
    setNewNumber("");
  };

  const createPerson = (e) => {
    e.preventDefault();

    const userInList = persons.filter((person) => {
      return person.name === newName;
    });
    if (!userInList[0]) {
      personsServices
        .create({ name: newName, number: newNumber })
        .then((response) => setPersons(persons.concat(response)));
      resetValues();
    } else {
      let input = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (input) {
        updatePerson(userInList[0]);
      }
    }
  };

  const updatePerson = (person) => {
    personsServices
      .update(person.id, { name: newName, number: newNumber })
      .then((response) =>
        setPersons(
          persons.map((user) => (user.id === person.id ? response : user))
        )
      );
    resetValues();
  };

  const deletePerson = (id) => {
    let person = persons[id - 1];
    let input = window.confirm(`Delete ${person.name} ?`);
    if (input) {
      personsServices
        .deletePerson(id)
        .then(() => setPersons(persons.filter((user) => user.id !== id)));
    }
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
      <Persons persons={results} deletePerson={deletePerson} />
    </div>
  );
}

export default App;

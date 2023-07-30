import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsServices from "./services/persons";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [success, setSuccess] = useState(null);
  const results =
    searchInput === ""
      ? persons
      : persons.filter((person) => {
          const name = person.name.toLowerCase();
          return name.includes(searchInput.toLowerCase());
        });

  useEffect(() => {
    personsServices
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(() => {
        setErrorMessage("Failed to retrieve data from server");
      });
  }, []);

  const resetValues = () => {
    setNewName("");
    setNewNumber("");
  };

  const setSuccessMessage = (input) => {
    setNotification(input);
    setSuccess(true);
  };

  const setErrorMessage = (input) => {
    setNotification(input);
    setSuccess(false);
  };

  const createPerson = (e) => {
    e.preventDefault();

    const userInList = persons.filter((person) => {
      return person.name === newName;
    });
    if (!userInList[0]) {
      personsServices
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response));
          setSuccessMessage(`${response.name} has been created!`);
          resetValues();
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
        });
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
      .then((response) => {
        setPersons(
          persons.map((user) =>
            user.id === person.id
              ? { id: person.id, name: newName, number: newNumber }
              : user
          )
        );
        resetValues();
        setSuccessMessage(`${person.name} has been updated!`);
      })
      .catch(() => {
        setErrorMessage(`${person} was not updated`);
      });
  };

  const deletePerson = (person) => {
    let input = window.confirm(`Delete ${person.name} ?`);
    if (input) {
      personsServices
        .deletePerson(person.id)
        .then(() => {
          setSuccessMessage(`${person.name} has been deleted!`);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
        });
      setPersons(persons.filter((user) => user.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification}
        setMessage={setNotification}
        success={success}
        setSuccess={setSuccess}
      />
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
      <Persons persons={results} deletePerson={deletePerson} />
    </div>
  );
}

export default App;

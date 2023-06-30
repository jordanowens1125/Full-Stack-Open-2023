import Person from "./Person";

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person, id) => (
        <Person person={person} key={person.id} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default Persons;

import Person from "./Person"

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person, id) => (
        <Person person={person} key={ id} />
      ))}
    </div>
  );
}

export default Persons
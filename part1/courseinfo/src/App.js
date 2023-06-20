const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => {
        return <Part part={part} key={index} />;
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach((element) => {
    total += element.exercises;
  });
  return <p>Number of exercises {total}</p>;
};

const App = () => {
 
  const part1 = { name: "Fundamentals of React", exercises: 10 };
  const part2 = { name: "Using props to pass data", exercises: 7 };
  const part3 = { name: "State of a component", exercises: 14 };
  const parts = [part1, part2, part3];
  const course = { name: "Half Stack application development", parts: parts };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;

import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return <Course course={course} key={course.id} />;
      })}
    </div>
  );
};

export default Courses;

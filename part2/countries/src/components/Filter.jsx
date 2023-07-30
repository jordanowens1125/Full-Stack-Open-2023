const Filter = ({ input, setInput }) => {
  return (
    <div>
      <p>
        Find Countries: <input type="text" value={input} onChange={setInput} />
      </p>
    </div>
  );
};

export default Filter;

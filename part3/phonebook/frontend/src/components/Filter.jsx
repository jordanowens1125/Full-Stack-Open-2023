const Filter = ({ searchInput, setSearchInput }) => {
  return (
    <div>
      <p>Filter shown with</p>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
      />
    </div>
  );
};

export default Filter;

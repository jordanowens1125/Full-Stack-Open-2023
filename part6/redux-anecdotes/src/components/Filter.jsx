import { useDispatch, useSelector } from "react-redux";
import { ClearFilter, SetFilter } from "../reducers/filterReducer";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <label htmlFor="">Filter: </label>
      <input
        type="text"
        value={filter}
        onChange={(e) => dispatch(SetFilter(e.currentTarget.value))}
      />
      <button onClick={() => dispatch(ClearFilter(""))}>Clear</button>
    </div>
  );
};

export default Filter;

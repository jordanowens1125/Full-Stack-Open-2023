const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    case "CLEAR_FILTER": {
      return "";
    }
    default:
      return state;
  }
};

export const ClearFilter = () => {
  return {
    type: "CLEAR_FILTER",
  };
};

export const SetFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export default reducer;

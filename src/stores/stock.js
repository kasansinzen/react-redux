import _ from "lodash";

export default (state = [], action) => {
  switch (action.type) {
    case "INCREMENT":
      let sum = state.length > 0 ? (_.last(state) + action.value) : action.value;
      state.push(sum);
      return [...state];
    case "DECREMENT":
      let index = state.findIndex((res) => res == action.value);
      if (index != -1)
        return [...state.slice(index, 1)];
      else
        return [];
    default:
      return state;
  }
}
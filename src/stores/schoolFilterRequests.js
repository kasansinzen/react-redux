export default (state = {region: "", province: "", areaname: "", company: "", schoolSearch: ""}, action) => {
  switch (action.type) {
    case "REGION":
      state = {...state, region: action.value};
      return state;
    case "PROVINCE":
      state = {...state, province: action.value};
      return state;
    case "AREA":
      state = {...state, areaname: action.value};
      return state;
    case "PARTNER":
      state = {...state, company: action.value};
      return state;
    case "Q":
      state = {...state, schoolSearch: action.value};
      return state;
    // CLEAR STATE
    case "CLEAR":
      state = {region: "", province: "", areaname: "", company: "", schoolSearch: "", page: 1};
      return state;
    default:
      return state;
  }
}
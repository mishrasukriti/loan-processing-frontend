const LoanRequestReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_LOAN_REQUESTS":
      return action.result;
    default:
      return state;
  }
};

export default LoanRequestReducer;

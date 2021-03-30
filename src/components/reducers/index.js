import LoanRequestReducer from "./LoanRequestReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  loanRequests: LoanRequestReducer,
});

export default rootReducers;

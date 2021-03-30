import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//ROUTES
import LandingPage from "./components/LandingPage";
import "./styles/style.css";


import BankManagerAllLoanRequest from "./components/BankManager/LoanRequest/AllLoanRequest";
import CRManagerAllLoanRequest from "./components/CRManager/LoanRequest/AllLoanRequest";
import UserDashboard from "./components/User/LoanRequest/CheckLoanRequestStatus";
import UserApplyLoan from "./components/User/LoanRequest/AllLoanRequest";

import BankManagerLogin from "./components/BankManager/BankManagerLogin";
import CRManagerLogin from "./components/CRManager/CRManagerLogin";
import UserLogin from "./components/User/UserLogin";
import UserSignup from "./components/User/UserSignup";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>

          
          <Route path="/" exact component={() => <LandingPage />} />
          <Route path="/bankManagerDashboard" exact component={()=> <BankManagerAllLoanRequest/>}/>
          <Route path="/crManagerDashboard" exact component={()=> <CRManagerAllLoanRequest/>}/>
          <Route path="/userDashboard" exact component={()=> <UserDashboard/>}/>
          <Route path="/applyLoan" exact component={()=> <UserApplyLoan/>}/>
          
          <Route path="/bankManagerlogin" exact component={() => <BankManagerLogin />} />
          <Route path="/crManagerlogin" exact component={() => <CRManagerLogin />} />
          <Route path="/userlogin" exact component={() => <UserLogin />} />
          <Route path="/signup" exact component={() => <UserSignup />} />
        
          
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;

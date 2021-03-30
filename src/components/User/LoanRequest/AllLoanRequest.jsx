import React, { useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";

import LoaderTemplate from "../templates/LoaderTemplate";

const AllLoanRequest = () => {

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  
  const onFormSubmit= (e)=>{
    console.log("clicked on form submit")

    const url = "https://loan-processing-backend.herokuapp.com/api/userActivity/applyLoan";
    const token = localStorage.getItem("token");
    const localStorageEmail = localStorage.getItem('email');
    if(email !== localStorageEmail) {
      alert("Please enter valid User EmailId for the user currently logged in. You have logged in with: " + localStorageEmail);
      return;
    }
    e.preventDefault();
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: {
        'userEmailId': email,
        'loanAmount': loanAmount
      }
    })
      .then((response) => {
        console.log("response in get AllgetLoanRequests which is loan amount is: ", response.data);
        alert("Loan Application Successful. Please note Loan requestId for further correspondence!!", response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  
  return (
    <React.Fragment>
      {isLoading && (
        <LoaderTemplate
          title={`Loan-Request`}
          content={`Loading`}
        />
      )}
      {!isLoading  && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav />
          </div>
          <div className="main-content">
            
            <div >
            <div className="ui inverted segment">
              <form className="ui inverted form">
              <div className="two fields">
                  <div className="field">
                    <label>First Name</label>
                    <input placeholder="firstName" type="text" />
                  </div>
                  <div className="field">
                    <label>Last Name</label>
                    <input placeholder="lastName" type="text" />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <label>Email-Id</label>
                    <input placeholder="EmailId" type="text" onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Loan Amount</label>
                    <input placeholder="loanAmount" type="text" onChange={(e)=>setLoanAmount(e.target.value)} />
                  </div>
                </div>
                <div className="inline field">
                  <div className="ui checkbox">
                    <input type="checkbox" />
                    <label>I agree to the terms and conditions</label>
                  </div>
                </div>
                <div className="ui submit button" onClick = {onFormSubmit}>Submit</div>
              </form>
            </div>
              
            </div>
          </div>
        </div>
      )}
      
    </React.Fragment>
  );
};

export default AllLoanRequest;

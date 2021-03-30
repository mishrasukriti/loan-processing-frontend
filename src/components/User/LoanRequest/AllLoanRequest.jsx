import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadLoanRequests } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";

const Invoice = () => {

  const [isLoading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  

  // const [searchSuccessful, setsSarchSuccessful] = useState(false);



  let results = useSelector((state) => state.loanRequests);
  const dispatch = useDispatch();
  
  const onFormSubmit= (e)=>{
    console.log("clicked on form submit")
    // setLoading(true);
    const url = "http://localhost:4050/api/userActivity/applyLoan";
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
        console.log("response in get AllgetLoanRequests is: ", response.data);
        // dispatch(LoadLoanRequests(response.data));
        console.log("Loan Application Successful!!");
        alert("Loan Application Successful. Please note Loan requestId for further correspondence!!", response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    
    const url = "http://localhost:4050/api/crmActivity/listCRMLoanRequests";
    const getLoanRequests = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem('email');
      console.log("calling for crm email is: " + email);
      setLoading(false);
    };
    getLoanRequests();
  }, [dispatch]);

  
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
                    <input placeholder="firstName" type="text" onChange={(e)=>setFirstName(e.target.value)}/>
                  </div>
                  <div className="field">
                    <label>Last Name</label>
                    <input placeholder="lastName" type="text" onChange={(e)=>setLastName(e.target.value)} />
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

export default Invoice;

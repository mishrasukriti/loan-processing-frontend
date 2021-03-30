import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";

import Loader from "react-loader-spinner";
import ErrorMsg from "../ErrorMsg";

const UserSignup = () => {
  const [isLoading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  const [validEmail, setValidEmail] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const validateAndSetEmail = (v) => {
    if (emailPattern.test(v)) {
      setValidEmail(true);
      setShowEmailError(false);
    } else {
      setValidEmail(false);
      setShowEmailError(true);
    }
    setEmail(v);
  };

  const validateAndSetPassword = (v) => {
    if (v.length < 1) {
      setValidPassword(false);
      setShowPasswordError(true);
    } else {
      setValidPassword(true);
      setShowPasswordError(false);
    }
    setPassword(v);
  };

  const onFormSubmit= (e)=>{
    console.log("clicked on form submit")
    // setLoading(true);
    const url = "https://loan-processing-backend.herokuapp.com/api/user/register";
    const token = localStorage.getItem("token");
    
    e.preventDefault();
    axios({
      url: url,
      method: "post",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      data: {
        'fname': firstName,
        'lname': lastName,
        'email': email,
        'password': password,
      }
    })
      .then((response) => {
        alert("User Registration Successful. Please login to apply for loan request");
        history.push('/userlogin');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <React.Fragment>
      <ToastContainer />
      {isLoading && (
        <div >
          <Loader type="Audio" color="#897eff" height={100} width={100} />
          <p>Please wait while we verify....</p>
        </div>
      )}
      {!isLoading && (
        <div >
          <div >
            <div >
            <nav>
          {/* <div><img  src={logo} alt=""/> </div> */}
            <div >
              <div class="ui inverted segment">
                <div class="ui inverted secondary pointing menu">
                  <a class="item active" href="/userlogin">
                  User
                  </a>
                  <a class="item" href="/crManagerlogin">
                  CRManager
                  </a>
                  <a class="item" href="/bankManagerlogin">
                  BankManager
                  </a>
                </div>
              </div>
            </div>
          </nav>
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
                    <input placeholder="EmailId" type="text" onChange={(e)=>validateAndSetEmail(e.target.value)} />
                    <ErrorMsg show={showEmailError} msg={'Invalid e-mail!'} />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input placeholder="loanAmount" type="password" onChange={(e)=>validateAndSetPassword(e.target.value)} />
                    <ErrorMsg show={showPasswordError} msg={'Empty password!'} />
                  </div>
                </div>
                <div className="inline field">
                  <div className="ui checkbox">
                    <input type="checkbox" />
                    <label>I agree to the terms and conditions</label>
                  </div>
                </div>
                <div className="ui submit button" onClick = {onFormSubmit} disabled={!validEmail || !validPassword}>Submit</div>
              </form>
          </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserSignup;

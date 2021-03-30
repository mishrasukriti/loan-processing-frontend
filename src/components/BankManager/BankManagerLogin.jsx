import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorMsg from '../ErrorMsg';
import { Link } from "react-router-dom";



const BankManagerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const url = `http://localhost:4050/api/bankManager/login`;

  const ErrorNotify = (message) => toast.error(message);

  const loginUser = (event) => {
    setLoading(true);
    event.preventDefault();
    
    const response = { email: email, password: password };
    axios({
      url: url,
      method: "POST",
      data: response,
    })
      .then((response) => {
        // console.log(response);
        setLoading(false);
        if (response.data.message) {
          ErrorNotify(response.data.message);
        } else {
          setLoading(false);
          localStorage.setItem("token", response.data);
          localStorage.setItem("email", email);
          history.push("/bankManagerDashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        ErrorNotify("Incorrect Credentials");
      });
  };

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
          <div class="ui placeholder segment">
          <div class="ui two column very relaxed stackable grid">
            <div class="column">
              <div class="ui form">
                <div class="field">
                  <label>Username</label>
                  <div class="ui left icon input">
                    <input type="text" placeholder="Username" name="email" placeholder="enter email-id" onChange={(e) => validateAndSetEmail(e.target.value)}/>
                    <i class="user icon"></i>
                  </div>
                </div>
                <div class="field">
                  <label>Password</label>
                  <div class="ui left icon input">
                    <input type="password" name="password" placeholder="enter password" onChange={(e) => validateAndSetPassword(e.target.value)}/>
                    <i class="lock icon"></i>
                  </div>
                </div>
                <div class="ui blue submit button" onClick={(e) => loginUser(e)} disabled={!validEmail || !validPassword}>Login</div>
              </div>
            </div>
            <div class="middle aligned column">
              <div class="ui big button">
                <i class="signup icon"></i>
                Sign Up
              </div>
              <br/>
              <div class="ui big button" onClick={(event) => {event.preventDefault();history.push("/");}}>
                <i class="signup icon"></i>
                Go Back
              </div>
            </div>
          </div>
          <div class="ui vertical divider">
            Or
          </div>
        </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BankManagerLogin;

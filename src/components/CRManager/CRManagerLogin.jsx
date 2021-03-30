import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorMsg from '../ErrorMsg';

const CRManagerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const url = `https://loan-processing-backend.herokuapp.com/api/crManager/login`;

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

        setLoading(false);
        if (response.data.message) {
          ErrorNotify(response.data.message);
        } else {
          setLoading(false);
          localStorage.setItem("token", response.data);
          localStorage.setItem("email", email);
          console.log("crManagerLogin Success");
          history.push("/crManagerDashboard");
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

                <div >
                  <div className="ui inverted segment">
                    <div className="ui inverted secondary pointing menu">
                      <a className="item active" href="/userlogin">
                        User
                  </a>
                      <a className="item" href="/crManagerlogin">
                        CRManager
                  </a>
                      <a className="item" href="/bankManagerlogin">
                        BankManager
                  </a>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                  <div className="column">
                    <div className="ui form">
                      <div className="field">
                        <label>Username</label>
                        <div className="ui left icon input">
                          <input type="text" name="email" placeholder="enter email-id" onChange={(e) => validateAndSetEmail(e.target.value)} />
                          <ErrorMsg show={showEmailError} msg={'Invalid e-mail!'} />
                          <i className="user icon"></i>
                        </div>
                      </div>
                      <div className="field">
                        <label>Password</label>
                        <div className="ui left icon input">
                          <input type="password" name="password" placeholder="enter password" onChange={(e) => validateAndSetPassword(e.target.value)} />
                          <ErrorMsg show={showPasswordError} msg={'Empty password!'} />
                          <i className="lock icon"></i>
                        </div>
                      </div>
                      <div className="ui blue submit button" onClick={(e) => loginUser(e)} disabled={!validEmail || !validPassword}>Login</div>
                    </div>
                  </div>
                  <div className="middle aligned column">
                    <div className="ui big button">
                      <i className="signup icon"></i>
                Sign Up
              </div>
                    <br />
                    <div className="ui big button" onClick={(event) => { event.preventDefault(); history.push("/"); }}>
                      <i className="signup icon"></i>
                Go Back
              </div>
                  </div>
                </div>
                <div className="ui vertical divider">
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

export default CRManagerLogin;

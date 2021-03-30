import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorMsg from '../ErrorMsg';
import { Link } from "react-router-dom";



const UserSignup = () => {
  const [isLoading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const url = `http://localhost:4050/api/user/login`;

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
          history.push("/userDashboard");
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

  const onFormSubmit= (e)=>{
    console.log("clicked on form submit")
    // setLoading(true);
    const url = "http://localhost:4050/api/user/register";
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
        // console.log("response in get AllgetLoanRequests is: ", response.data);
        // dispatch(LoadLoanRequests(response.data));
        console.log("User Registration Successful!!");
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
                    <input placeholder="EmailId" type="text" onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input placeholder="loanAmount" type="password" onChange={(e)=>setPassword(e.target.value)} />
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

export default UserSignup;

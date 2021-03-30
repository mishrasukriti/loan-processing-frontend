import React from "react";

const delToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};
const Sidenav = () => {
  return (
    <React.Fragment>
    <div className="ui inverted segment">
      <div className="ui inverted secondary pointing menu">
      <a className="item" href="/">
      Go to Home
        </a>
        <a className="item active" href="/crManagerDashboard">
          Review your Loan Requests
        </a>
        <div className="right menu">
          <a className="item" onClick={() => delToken()} href="/">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
              <div className="ui primary button">Sign Out</div>
          </a>
        </div>
      </div>
    </div>
    <strong>
    <h1 className="ui header" align="center">
      {/* <img src={banner} className="ui circular image" /> */}
      Bank Manager Dashboard for {localStorage.getItem('email')}
      <br/>
      <hr/>
    </h1>
    </strong>
    </React.Fragment>
  );
};

export default Sidenav;

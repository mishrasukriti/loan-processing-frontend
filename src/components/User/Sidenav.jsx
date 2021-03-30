import React from "react";


const delToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
};

const Sidenav = () => {
  return (
    <React.Fragment>
      
    <div class="ui inverted segment">
          <div class="ui inverted secondary pointing menu">
          <a class="active item" href="/">
        Go to Home
      </a>
      <a class="item" href="/applyLoan">
        Apply Loan
      </a>
      <a class="item" href="/userDashboard">
        Check Loan Status
      </a>
            <div class="right menu">
        <a class="item" onClick={() => delToken()} href="/">
          <i className="fa fa-sign-out" aria-hidden="true"></i>
            <div class="ui primary button">LogOut</div>
        </a>
      </div>
          </div>
        </div>
    <strong>
      <h1 class="ui header" align="center">
        {/* <img src={banner} class="ui circular image" /> */}
        User Dashboard for {localStorage.getItem('email')}
        <br/>
        <hr/>
      </h1>
    </strong>
    </React.Fragment>
  );
};

export default Sidenav;

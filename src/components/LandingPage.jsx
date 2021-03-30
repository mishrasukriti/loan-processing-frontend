import React from "react";
import banner from "../assets/Digital-Loan-Management-System.jpeg";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div >
        <div >
          <nav>
          {/* <div><img  src={logo} alt=""/> </div> */}
            <div >
              <div class="ui inverted segment">
                <div class="ui inverted secondary pointing menu">
                  <a class="item" href="/userlogin">
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
          <div >
          <center><img style={{ width:"90%"}} className="banner" src={banner} alt=""/></center>
        </div>
        </div>

        <footer>
          <center>Copyrights @ LOAN PROCESS 2021</center>
        </footer>

      </div>
    </React.Fragment>
  );
};

export default LandingPage;

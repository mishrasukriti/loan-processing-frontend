import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "../Sidenav";
import { useSelector, useDispatch } from "react-redux";
import { LoadLoanRequests } from "../../actions/index";
import LoaderTemplate from "../templates/LoaderTemplate";
import TableComponent from "../TableComponent";

const Invoice = () => {

  const [isLoading, setLoading] = useState(true);
  // const [searchSuccessful, setsSarchSuccessful] = useState(false);



  let results = useSelector((state) => state.loanRequests);
  const dispatch = useDispatch();
  

  useEffect(() => {
    
    const url = "https://loan-processing-backend.herokuapp.com/api/userActivity/fetchLoanRequests";
    const getLoanRequests = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem('email');
      console.log("calling for crm email is: " + email);
      axios({
        url: url,
        method: "post",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        data: {
          'userEmailId': email
        }
      })
        .then((response) => {
          console.log("response in get AllgetLoanRequests is: ", response.data);
          dispatch(LoadLoanRequests(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
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
              
              <TableComponent loanRequests = {results}/>
            </div>
          </div>
        </div>
      )}
      
    </React.Fragment>
  );
};

export default Invoice;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    
    const url = "http://localhost:4050/api/bankManagerActivity/listAllLoanRequests";
    const getLoanRequests = async () => {
      const token = localStorage.getItem("token");
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log("response in get AllgetLoanRequests is: ", response.data);
          dispatch(LoadLoanRequests(response.data));
          console.log("results is: ", results);
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
            {/* <TitleTemplate
              title={`Loan Requests`}
            /> */}
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

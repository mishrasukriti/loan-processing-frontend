import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import Sidenav from "../Sidenav";

import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoanRequest = ({ match }) => {
  const history = useHistory();
  const loanRequests = useSelector((state) => state.loanRequests);
  const [isLoading, setLoading] = useState(false);
  // console.log("results in particular invoce is: ", results);
  //const services = results.filter((result) => result._id === match.params.id);

  const successNotify = (msg) => toast.success(msg);
  const failedNotify = (msg) => toast.error(msg);


  // console.log("services in particular invoce is: ", services);
  const [view, setView] = useState("noedit");

  const dispatch = useDispatch();

  
  
  const url = "https://sukriti-invoice-server.herokuapp.com/api/admindashboard/invoice";

  useEffect(() => {
    
    const url = "https://loan-processing-backend.herokuapp.com/api/bankManagerActivity/listAllLoanRequests";
    const getLoanRequest = async () => {
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
          console.log("response in  listAllLoanRequests is: ", response);
          // dispatch(LoadAllLoanRequest(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getLoanRequest();
  }, [dispatch]);

  
  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dates);
    return formattedDate;
  };

  return (
    <React.Fragment>
      <ToastContainer />
      {view === "noedit" && (
        <div >
          <div >
            <Sidenav />
          </div>
          <div >
            <div >
              <div>Loan Request</div>
              <button
                  type="button"
                  onClick={() => history.push("/admindashboard/invoice")}
                >
                  Back
                  <i className="material-icons"> &#xe5c4;</i>
              </button>
            </div>
            <hr/>
            <div className="content">
              {loanRequests.map((result) => (
                <div key={result._id} >
                  <ul>
                    <li>
                      <b>Invoice Number</b>
                      <p>{result.invoiceNumber}</p>
                    </li>
                    <li>
                      <b>Client Name</b>
                      <p>{result.clientName}</p>
                    </li>
                    <li>
                      <b>Client Email</b>
                      <p>{result.clientEmail}</p>
                    </li>
                    <li>
                      <b>Client Number</b>
                      <p>{result.clientNumber}</p>
                    </li>
                    <li>
                      <b>Due Date</b>
                      <p>{convertDate(result.dueDate)}</p>
                    </li>
                    
                    <li>
                      <b>Total Balance</b>
                      <p>{result.totalPrice}</p>
                    </li>
                    
                  </ul>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        setView("edit");
                      }}
                    >
                      Update
                      <i className="material-icons">&#xe3c9;</i>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        localStorage.setItem("key", result._id);
                        // generatePDF();
                        // setView("edit");
                      }}
                    >
                      Generate Pdf
                      <i className="material-icons">picture_as_pdf</i>
                    </button>

                    <Link
                      // onClick={() => delInvoice(result._id)}
                    >
                      <button type="button">
                        Delete
                        <i className="material-icons">&#xe872;</i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* {view === "edit" && <EditInvoice />} */}
    </React.Fragment>
  );
};

export default LoanRequest;

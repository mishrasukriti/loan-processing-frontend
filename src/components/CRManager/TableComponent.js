import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const TableComponent = ({loanRequests}) => {
    const [isLoading, setLoading] = useState(true);
    const url = "http://localhost:4050/api/crmActivity/updateLoanStatus";
    const approveLoan = async (loanRequestId)=>{
        const token = localStorage.getItem("token");
        // console.log("Got requestId as: ", requestId);
        axios({
            url: url,
            method: "put",
            headers: {
            "auth-token": token,
            "Content-Type": "application/json",
            },
            data: {
                'isAccepted': true,
                'loanRequestId': loanRequestId
            }
        })
            .then((response) => {
            console.log("response in get updateLoanStatus is: ", response.data);
            setLoading(false);
            alert(response.data);
            window.location.reload();
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("Loan Approval Failed. Please try later");
            });  
    };

    const rejectLoan = async (loanRequestId)=>{
        const token = localStorage.getItem("token");
        // console.log("Got requestId as: ", requestId);
        axios({
            url: url,
            method: "put",
            headers: {
            "auth-token": token,
            "Content-Type": "application/json",
            },
            data: {
                'isAccepted': false,
                'loanRequestId': loanRequestId
            }
        })
            .then((response) => {
                setLoading(false);
                alert(response.data);
                window.location.reload();
                
            })
            .catch((err) => {
            console.log(err);
            setLoading(false);
            alert("Loan Rejection Failed. Please try later");
            });  
    };

  return (
    <table className="ui striped table" >
    <thead>
      <tr>
        <th>Loan RequestId</th>
        <th>User E-mail</th>
        <th>CRM E-mail</th>
        <th>Loan Amount</th>
        <th>Status</th>
        <th>Loan Request Date</th>
        <th>Approve/Reject</th>
      </tr>
    </thead>
    <tbody>
        {
            loanRequests.map((loanRequest, index) => (
                <tr key={index} >
                    <td>
                        <p>{loanRequest.loanRequestId}</p>
                    </td>
                    <td>
                        <p>{loanRequest.userEmailId}</p>
                    </td>
                    <td>
                        <p>{loanRequest.assignedCRMEmailId}</p>
                    </td>
                    <td>
                        <p>{loanRequest.loanAmount}</p>
                    </td>
                    <td>
                        <p>{loanRequest.currentStatus}</p>
                    </td>
                    <td>
                        <p>{loanRequest.creationTime}</p>
                    </td>
                    <td>
                    <div className="ui buttons" >
                        <button className="ui button" onClick ={() => rejectLoan(loanRequest.loanRequestId)}>Reject</button>
                        <div className="or"></div>
                        <button className="ui positive button" onClick ={() => approveLoan(loanRequest.loanRequestId)}>Approve</button>
                    </div>
                    </td>
                </tr>
            ))
        }
        
    </tbody>
  </table>
  )
  }

export default TableComponent
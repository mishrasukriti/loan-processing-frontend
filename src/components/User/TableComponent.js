import React from 'react'

const TableComponent = ({ loanRequests }) => {
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
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default TableComponent
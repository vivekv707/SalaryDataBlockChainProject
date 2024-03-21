import React, { useEffect, useState } from 'react';

function Employee(props) {
    const [employee, setEmployee] = useState({
        empid: props.empid,
        name: props.name,
        department: props.department,
        designation: props.designation,
        payments: props.payments,
        totalPaid: props.totalPaid,
        salarySlips: props.salarySlips
    });

    useEffect(() => {
        setEmployee({
            empid: props.empid,
            name: props.name,
            department: props.department,
            designation: props.designation,
            payments: props.payments,
            totalPaid: props.totalPaid,
            salarySlips: props.salarySlips
        });
    }, [props]);

    return (
<div class="container mt-3">
  <h2>Employee Details</h2>
  <div class="row">
    <div class="col-md-6">
      <p><strong>Employee ID:</strong> {employee.empid}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Designation:</strong> {employee.designation}</p>
    </div>
    <div class="col-md-6">
      <h3>Payments</h3>
      {employee.payments && employee.payments.map((payment, index) => (
        <p key={index}><strong>Payment {index + 1}:</strong> {payment}</p>
      ))}
      <p><strong>Total Paid:</strong> {employee.totalPaid}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Salary Slips</h3>
      {employee.salarySlips && employee.salarySlips.map((slip, index) => (
        <p key={index}><strong>Salary Slip {index + 1}:</strong> <a href={`http://localhost:8080/ipfs/${slip}`} target='_blank'>View Salary Slip</a></p>
      ))}
    </div>
  </div>
</div>

    );
}

export default Employee;

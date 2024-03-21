import React, { useState, useEffect } from 'react';
import { contractAddress,abi } from './Contract';
const {ethers} = require("ethers")
const AddEmployeeDetails = ({ currentAccount,admin }) => {
    const [empid, setEmpid] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    
    const addEmployeeHandler = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            let signer = null;
    
            let provider;
    
            if (window.ethereum == null) {
    
                console.log("MetaMask not installed; using read-only defaults")
                provider = ethers.getDefaultProvider()
    
            } else {
    
                provider = new ethers.BrowserProvider(window.ethereum)
                signer = await provider.getSigner();
            }
            const salaryContract = new ethers.Contract(contractAddress, abi, signer);
            if (empid == '' || name == '' || department == '' || designation == ''){
                alert('Fill form correctly pls :(');
                return
            }
            console.log("Initialize get transaction");
            let EmpAddTxn = salaryContract.addEmployee(empid, name, department, designation);
     
            console.log("Mining... please wait");
            EmpAddTxn.then((transaction)=>{
              console.log(transaction)
              alert('Added Employee')
              
            }).catch(err =>{
              console.log(err);
              alert('Only admins can add employee and pay salary');
            })
            
    
          } else {
            console.log("Ethereum object does not exist");
          }
    
        } catch (err) {
          console.log(err);
        }
       }

    const addEmployeeButton = () => {
        return (
<div className="container">
  
    <div className="mb-3">
    <div className="col-md-6">
      <label for="empid" className="form-label">Employee ID</label>
      <input type="text" className="form-control" id="empid" value={empid} onChange={e => setEmpid(e.target.value)} />
      </div>
    </div>
    <div className="mb-3">
    <div className="col-md-6">
      <label for="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} />
      </div>
    </div>
    <div className="mb-3">
    <div className="col-md-6">
      <label for="department" className="form-label">Department</label>
      <input type="text" className="form-control" id="department" value={department} onChange={e => setDepartment(e.target.value)} />
      </div>
    </div>
    <div class="mb-3">
    <div class="col-md-6">
      <label for="designation" className="form-label">Designation</label>
      <input type="text" className="form-control" id="designation" value={designation} onChange={e => setDesignation(e.target.value)} />
      </div>
    </div>
    <button onClick={addEmployeeHandler} class="btn btn-primary">
      Add Employee Details
    </button>

</div>

         
        )
      }


    return (
     <div>
      {currentAccount && admin? addEmployeeButton(): 'Only Admins can add Employees contact admin pls 🏢'}
      </div>
    );
};

export default AddEmployeeDetails;
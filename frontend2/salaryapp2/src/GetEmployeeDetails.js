import React, { useState, useEffect } from 'react';
import { contractAddress,abi } from './Contract';
import Employee from './Components/Employee';
import { create } from 'ipfs-http-client';
const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
const {ethers} = require("ethers")
const GetEmployeeDetails = ({ currentAccount,admin }) => {
    const [employee, setEmployee] = useState(null);
    const [empidtofind,setEmpidtofind] = useState('');
    const [salaryToPay,setSalaryToPay] = useState('');
    const [employees, setEmployees] = useState([]);
    const [file, setFile] = useState(null);
    const getEmployeeHandler = async () => {
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
            if (empidtofind == ''){
                alert('Input is not correct :(');
                return;
            }
            console.log("Initialize get transaction");
            let SalarygetTxn = salaryContract.getEmployee(empidtofind);
            console.log(SalarygetTxn)
            console.log("Mining... please wait");
            SalarygetTxn.then((transaction)=>{
              if(transaction[0]==""){
                alert('Employee not found');
              }
              else{
              let totalPaid = String(Number(transaction[4]));
              let payments = transaction[3]
              let pays = []
              console.log(payments.length)
              payments.forEach(element => {
                pays.push(String(Number(element)));
              });
              console.log(pays)
              setEmployee({
                empid: empidtofind,
                name: transaction[0],
                department: transaction[1],
                designation: transaction[2],
                payments: pays,
                totalPaid: totalPaid,
                salarySlips:transaction[5]
              });
            }
    
    
            })
            
    
          } else {
            console.log("Ethereum object does not exist");
          }
    
        } catch (err) {
          console.log(err);
        }
       }

       const paySalaryHandler = async () => {
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
            const nftContract = new ethers.Contract(contractAddress, abi, signer);
            let result = null
            try {
    
              result = await ipfs.add(file);
              console.log('IPFS result', result);
              } catch (error) {
              console.error('Error uploading file: ', error);
              return
            }
            console.log("Initialize get transaction");
            let salary = Number(salaryToPay)
            console.log(result)
            if (typeof salary === 'number' && salary > 0) {
              let SalaryAddTxn = nftContract.paySalary(employee.empid,salaryToPay,result['path']);
              console.log(SalaryAddTxn)
              console.log("Mining... please wait");
              SalaryAddTxn.then((transaction)=>{
              console.log(transaction)
              
            }).catch(err =>{
              console.log(err);
              alert('Only admins can add employee and pay salary');
            })
          } else {
            alert('Salary amount is erroneous')
          }
            
            
    
          } else {
            console.log("Ethereum object does not exist");
          }
    
        } catch (err) {
          console.log(err);
        }
       }
      

       const paySalaryButton = () => {
        return (
            <div class="container">
                    <div class="mb-3 mt-3 col-md-6">
                    <label for="salaryToPay" class="form-label">Salary To Pay 💵</label>
                    <input type="number" class="form-control" id="salaryToPay" value={salaryToPay} onChange={e => setSalaryToPay(e.target.value)} />
                    </div>
                    <div class="mb-3 col-md-6">
                    <label for="fileUpload" class="form-label">Upload Salary Slip 📃</label>
                    <input type="file" class="form-control" id="fileUpload" onChange={handleFileChange} />
                    </div>
                    <button onClick={paySalaryHandler} class="btn btn-primary">
                    Pay Salary
                    </button>

                </div>
        )
      }
      
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const getEmployeeButton = ()=>{
        return (
        <div className='container'>
          <div class="mb-3 col-md-6">
             <label for="empidtofind" class="form-label">Employee ID to find 🤔</label>
            <input type="text" class="form-control" id="empidtofind" value={empidtofind} onChange={e => setEmpidtofind(e.target.value)} />
             </div>
             <button onClick={getEmployeeHandler} className="btn btn-primary">
                Get Employee details
                </button>
        </div>
        );
    }
    const fetchEmployees = async () => {
        try{
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
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        // Call the getAllEmployeeIds function from your contract
        const ids = await nftContract.getAllEmployeeIds();
        console.log(ids)
        // Fetch the details for each employee
        const employeePromises = ids.map(id => nftContract.getEmployee(id));
        const employeeDetails = await Promise.all(employeePromises);
        console.log(employeeDetails)
        // Map the details to an array of employee objects
        const employees = employeeDetails.map((details, index) => ({
            id: Number(ids[index]),
            name: details[0],
            department: details[1],
            designation: details[2],
            payments: details[3],
            totalPaid: details[4]
        }));
    
        setEmployees(employees);
      }
      else{
        console.log("Ethereum object does not exist");
      }}
      catch(err){
        console.log(err);
      }
    };
      const AllEmployees = ()=> {
                
    
        return (
            <div class="container">
                <h2>Employees 🏢</h2>
                {employees.map(employee => (
                    <div key={employee.id} class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-md-6">
                            <p class="card-text"><strong>ID:</strong> {employee.id}</p>
                            <p class="card-text"><strong>Name:</strong> {employee.name}</p>
                        </div>
                        <div class="col-md-6">
                            <p class="card-text"><strong>Department:</strong> {employee.department}</p>
                            <p class="card-text"><strong>Designation:</strong> {employee.designation}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>


        );
    }

    return (
        <div className='row'>
        <div className='col-sm'>
        {currentAccount?getEmployeeButton():<div className='text-center'> Please connect wallet 😊</div>}
        {console.log(admin,employee,currentAccount)}
        {currentAccount && employee && admin? paySalaryButton():''}
        {employee && <Employee {...employee} />}
        
        </div>
        <div className='container col-sm'>
        {currentAccount ? <button onClick={fetchEmployees} className="btn btn-primary m-3" >Fetch Employees data</button>: ''}
        {employees.length>0 && <AllEmployees></AllEmployees>}
        </div>
        </div>
    );
};

export default GetEmployeeDetails;
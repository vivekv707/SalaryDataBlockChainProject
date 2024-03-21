import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import contract from './contracts/SalaryData.json';
import Navbar from './Navbar';
import GetEmployeeDetails from './GetEmployeeDetails';
import AddEmployeeDetails from './AddEmployeeDetails';
const contractAddress = "0x580CE28Bd8bAFb228eA8C9F2A1FfD0AC7BC1A1ed";
const abi = contract.abi;
const adminAddress = "0x4d340d75a9e8d5baef59a12d972e04611dfc0280";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [admin,setAdmin] = useState(null)
  const checkWalletIsConnected = async() => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
  
      if(account == adminAddress){
        console.log('this ran')
        setAdmin(account);
      }
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
   }

  // Check wallet connection status when the component mounts
  useEffect(() => {

    checkWalletIsConnected();

  }, []);

  const connectWalletHandler = async () => { 
    
    const { ethereum } = window;
    if(!ethereum){
      alert('Please Install Metamask');
    }
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      if(accounts[0] === adminAddress){
        console.log('this ran')
        setAdmin(accounts[0]);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='btn btn-outline-success'>
        Connect Wallet
      </button>
    )
  }


  return (
<div>
 <Router>
      <Navbar currentAccount={currentAccount} connectWalletButton={connectWalletButton}/>
      <Routes>
        <Route path="/" element=<GetEmployeeDetails admin={admin} currentAccount={currentAccount}/>>

        </Route>
        <Route path="/add-employee-details" element=<AddEmployeeDetails admin={admin} currentAccount={currentAccount} />>

        </Route>
      </Routes>
    </Router>
    
    </div>
  );
};

export default App;
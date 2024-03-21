import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentAccount,connectWalletButton }) => {
  return (
    <nav className='navbar navbar-expand-lg  navbar-dark bg-dark sticky-top '>
    <a class="navbar-brand p-3" href="#">Salary Data Smart Contract App 💸</a>
    
      <ul className='navbar-nav '>
        <li className='nav-item'>
          <Link to="/" className='nav-link'>Employee Dashboard🧑‍💻</Link>
        </li>
        <li className='nav-item'>
          <Link to="/add-employee-details" className='nav-link'>Add New Employee 🧑‍🏭</Link>
        </li>
        <li className='nav-item'>
       <div className='nav-link active '>
        Wallet Status: {currentAccount ? 'Connected😀' : ''}
        {currentAccount?'':connectWalletButton()}

        </div>
        </li>
      </ul>
      
    </nav>
  );
};

export default Navbar;

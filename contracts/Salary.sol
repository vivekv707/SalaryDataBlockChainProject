// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract SalaryData {
    struct Employee {
        string name;
        string department;
        string designation;
        uint[] payments;
        uint totalPaid;
    }

    mapping(int => Employee) public employees;
    mapping(int => string[]) public salarySlips;
    int[] public employeeIds; // Array to keep track of employee IDs
    address admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function.");
        _;
    }

    function addEmployee(int empid, string memory name, string memory department, string memory designation) public onlyAdmin {
        if (employees[empid].totalPaid == 0) {
            employeeIds.push(empid); // Add the employee ID to the array when a new employee is added
            Employee memory newEmployee = Employee(name, department, designation, employees[empid].payments, employees[empid].totalPaid);
            employees[empid] = newEmployee;
        }
        else{
             Employee memory newEmployee = Employee(name, department, designation, new uint[](0), 0);
             employees[empid] = newEmployee;
        }
        
    }

    function paySalary(int empid, uint amount, string memory ipfsCid) public onlyAdmin {
        employees[empid].payments.push(amount);
        employees[empid].totalPaid += amount;
        salarySlips[empid].push(ipfsCid); // Add the salary slip to the array
    }

    function getEmployee(int empid) public view returns (string memory, string memory, string memory, uint[] memory, uint, string[] memory) {
        Employee memory currentEmployee = employees[empid];
        return (currentEmployee.name, currentEmployee.department, currentEmployee.designation, currentEmployee.payments, currentEmployee.totalPaid, salarySlips[empid]);
    }


    function getAllEmployeeIds() public view returns (int[] memory) {
        return employeeIds;
    }
}

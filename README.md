# SalaryData : Salary Records Management Using Blockchain


## Introduction
The aim of this project is  to implement blockchain technology for Salary Data Management.


## Installation

The projects requires NodeJS and npm to work. Instructions to install all other dependencies are given below.
### Node modules

1. Move to the project directory and open it in your terminal.
2. Run `npm install` to install project dependenccties.

### Ganache

1. Go to [Ganache homepage](https://truffleframework.com/ganache) and download. 
2. If you are on Linux, you must have received an _.appimage_ file. Follow installation instructions available [here.](https://itsfoss.com/use-appimage-linux/)

### IPFS

1. Go to the [github page](https://github.com/ipfs/ipfs-desktop) of IPFS and install IPFS Desktop


### Metamask

1. Metamask is a browser extension available for Google Chrome, Mozilla Firefox and Brave Browser.
2. Go to the this [link](http://metamask.io/) and add Metamask to your browser.

## Getting the dApp running

### Configuration

#### 1. Ganache
  - Open Ganache and click on settings in the top right corner.
  - Under **Server** tab:
    - Set Hostname to 127.0.0.1 
    - Set Port Number to 7545
    - Enable Automine


#### 2. IPFS
  - Add the following IPFS Config in ipfs desktop app:
    ```
    "API": {
		"HTTPHeaders": {
			"Access-Control-Allow-Credentials": [
				"true"
			],
			"Access-Control-Allow-Headers": [
				"X-Requested-With",
				"Range",
				"User-Agent"
			],
			"Access-Control-Allow-Methods": [
				"GET",
				"PUT",
				"POST"
			],
			"Access-Control-Allow-Origin": [
				"*",
				"https://webui.ipfs.io",
				"http://webui.ipfs.io.ipns.localhost:8080"
			]
		}
	}
    ```
> Note :  use this config for local use only as it allows cors from any origin.
#### 3. Metamask
  - After installing Metamask, click on the metamask icon on your browser.
  - Click on __TRY IT NOW__, if there is an announcement saying a new version of Metamask is available.
  - Click on continue and accept all the terms and conditions after reading them.
  - Stop when Metamask asks you to create a new password. 
  
### Smart Contract

1. Install Truffle using `npm install truffle -g`
2. Compile Contracts using `truffle compile`

#### 1. Starting your local development blockchain
  - Open Ganache.
  - Make sure to configure it the way mentioned above.
  
1. Open new Terminal and deploy contracts using `truffle migrate`
2. Copy deployed contract address to frontend2/salaryapp2/src/Contract.js 

3. If you change contents of any contract , replace existing deployment using `truffle migrate --reset`
> Note :  reset of the contract will change the contract Address which needs to be updated in frontend2/salaryapp2/src/Contract.js 

### Running the dApp

#### 1. Connecting Metamask to our local blockchain
  - Connect metamask to localhost:7545

#### 2. Starting IPFS 
  - Start the IPFS Desktop Application
  
#### 3. Start a local server
  - Open a new terminal window and navigate to `/YOUR_PROJECT_DIRECTORY/app/`.
  - Run `npm start`.
  - Open `localhost:3000` on your browser.
  - The dApp will be up and running locally.

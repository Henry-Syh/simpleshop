const web3_provider = "https://rinkeby.infura.io/v3/66efdb368d63416582599fa47c84c42b";
const local_provider = "http://localhost:8545";

const simpleshopAddr = "0x25630e4d506D83c69c7e6B9dfC0aC931f853df4f";

const simpleshopABI = [{
  "inputs": [],
  "name": "sayHello",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "pure",
  "type": "function",
  "constant": true
}]

const web3 = new Web3("https://rinkeby.infura.io/v3/66efdb368d63416582599fa47c84c42b");
const mycontract = new web3.eth.Contract(simpleshopABI, simpleshopAddr);
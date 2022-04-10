document.addEventListener('DOMContentLoaded', function(event){

    if(window.ethereum){

        ethereum.request({method:"eth_requestAccounts"})
        .then(() => document.getElementById("account").click())
        .catch((err) => console.error(err.message));

        ethereum.on("chainChanged", window.location.reload());

        ethereum.on("accountChanged", (accounts) =>{
            if(accounts.length > 0){
                console.log(`Using account ${accounts[0]}`);
            } else {
                console.error("0 account");
            }
        });

        ethereum.on("message", (message) => console.log(message));

        ethereum.on("connect", (info) => {
            console.log(`Connected to network ${info}`);
        });

        ethereum.on("disconnect", (error) => {
            console.error(`Disconncet from network ${error}`);
        });

        const provider = new ethers.provider.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        const contract = new ether.Contract(address, abi, signer);

    } else {
        console.error("Install MetaMask or other browser extensions.");
    }
});
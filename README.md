# simpleshop

This is a simple contract project and front-end.

Go to contract and excute following cmd

Initial package.

    npm install
    

Compile and deploy contracts.

    truffle compile
    
    truffle migrate

Test contracts
    
    truffle develop
    
    test
    
Deploy (local)

    truffle migrate
or

    truffle deploy
    
Deploy
    
    truffle migrate --network YOUR_CONFIG_NETWORK
or

    truffle deploy --network YOUR_CONFIG_NETWORK
    
Verify on etherscan

    truffle run verify contract1 contract2 ... contractN --network YOUR_CONFIG_NETWORK
    
---------------------------------------------------------------------------------

Font-end part

Go to app folder, Nodejs is incomplete curently, if someone interested welcome 👏

Copy the ABI json file from contract/build/contracts to app/contracts.
Alter `contractModule` contract address which contract just deployed.

Deploy on http server. Done. 👍

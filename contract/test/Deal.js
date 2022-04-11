
const Deal = artifacts.require("./Deal.sol");

contract('Deal', (accounts) => {
    let _deal = null; 
    
    beforeEach("initial contract", async () => {
        _deal = await Deal.deployed({value:10000});
    });

    it('get contract balance', async () => {
        let balance2 = await _deal.getContractBalance();
        console.log(balance2);

    });

});

const {
    contract
} = await import("../Module/contractModule.js");

export class dealRepo{
    
    async init() {
        let _contract = new contract();
        this.instance = await _contract.init_contract(_contract.dealAddr, _contract.dealABI);
    }

    async buyItem(item) {

        const userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try { 

                let receipt = await this.instance.methods.buy(item.itemNo).send({ from: userAddress, value: String(item.price) });
                console.log(receipt);
                return true;

            } catch (error) {
                alert(`Deal failed! ${error.message}`);
                return false;
            }

        }
    }

}
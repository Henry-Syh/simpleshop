const { default: _deal } = await import("../contracts/Deal.json", { assert: { type: "json" } });
const { default: _item } =await import("../contracts/Item.json", { assert: { type: "json" } });
const { default: _owner } =await import("../contracts/Owner.json", { assert: { type: "json" } });

export class contract{
    rinkeby_provider = "https://rinkeby.infura.io/v3/66efdb368d63416582599fa47c84c42b";
    local_provider = "HTTP://127.0.0.1:7545"; // ganache
    metaMask = window.web3

    // is using provider
    usingProvider = this.metaMask;

    dealAddr = "0xD04513a23a12088Ec93EC57cE758BE664d00CEa2";

    dealABI = _deal.abi;
    itemABI = _item.abi;
    ownerABI = _owner.abi;

    // init contract
    async init_contract(contract_address, contract_abi){
        const web3 = await new Web3(this.usingProvider);
        let contract_instance = await new web3.eth.Contract(contract_abi, contract_address);

        return contract_instance;
    }

    // init contract
    async init_contract_provider_change(provider, contract_address, contract_abi){
        const web3 = await new Web3(provider);
        let contract_instance = await new web3.eth.Contract(contract_abi, contract_address);

        return contract_instance;
    }

    // test provider
    async get_provider_block(provider) {
        const web3 = new Web3(provider);
        web3.eth.getBlockNumber(function (error, result) {
            console.log("error = " + error);
            console.log("result = " + result);
        });
    }
}


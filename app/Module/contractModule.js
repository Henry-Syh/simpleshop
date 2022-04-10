const { default: _simpleshop } = await import("../contracts/Simpleshop.json", { assert: { type: "json" } });
const { default: _deal } = await import("../contracts/Deal.json", { assert: { type: "json" } });
const { default: _item } =await import("../contracts/Item.json", { assert: { type: "json" } });
const { default: _owner } =await import("../contracts/Owner.json", { assert: { type: "json" } });

export class contract{
    rinkeby_provider = "https://rinkeby.infura.io/v3/66efdb368d63416582599fa47c84c42b";
    local_provider = "http://localhost:8545"; // ganache
    
    // is using provider
    usingProvider = window.web3;

    // simpleshopAddr = "0x0D7C7bfA6B16fa00B1F80457B4B768d6b67e6975";
    dealAddr = "0x789E2362daf2Bb31d234EEd4238751859F05076C";
    itemAddr = "0x20C6876eA4e373ecD9E8b0f395C03d4Aa28982A8";
    ownerAddr = "0x573E5c8167EE54cC5591CeD721c416D99C59dE95";

    simpleshopABI = _simpleshop.abi;
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

export class simpleshopMethod{
    constructor(){}

    async init () {
        let _contract = new contract();
        this.instance = await _contract.init_contract(_contract.simpleshopAddr, _contract.simpleshopABI);
    }

    // call word
    async call_words() {
        var rtrnWord;
        await this.instance.methods.wordStr().call(async function (err, result) {
            console.log("call_error = " + err);
            console.log("call_result = " + result);
            rtrnWord = result;
        });

        console.log("rtrnWord = " + rtrnWord);
        return rtrnWord;
    }

    // set word
    async set_word(words, wallet_address){
        await this.instance.methods.setWord("test words").send({from: wallet_address})
            .on('transactionHash', function (hash) {
                // console.log(hash);
            })
            .on('receipt', function (receive) {
                // console.log(receive);
            });
    }

    // estimate gas limits for set_word
    async est_set_word(words){
        let gasEst = await this.instance.methods.setWord(words).estimateGas();
        console.log('gasEst2 = ' + gasEst);
        return gas_est;
    }

}

export class itemMethod{

    async setParam(itemNo, name, price, pic, status) {

        let param = {
            itemNo: `${itemNo}`,
            name: `${name}`,
            price: web3.utils.toWei(String(price), `ether`), //towei
            pic: `${pic}`,
            status: status == null ? 0 : status,
            itemsArraySeq: 0,
            myItemsMapSeq: 0,
            isLocked: false
        };
        return param;

        let param2 = {
            itemNo: ``,
            name: `item name 1`,
            price: web3.utils.toWei(String(0.52), `ether`), //towei
            pic: `pic.route`,
            status: 0,
            itemsArraySeq: 0,
            myItemsMapSeq: 0,
            isLocked: false
        };
        return param2;
    }

    async parseStatus(status) {
        switch (statusNumber) {
            case `0`:
                return `open`;
            case `1`:
                return `pedding`;
            case `2`:
                return `sold`;
            case `3`:
                return `close`;
            case `4`:
                return `delete`;
            case `open`:
                return 0;
            case `pedding`:
                return 1;
            case `sold`:
                return 2;
            case `close`:
                return 3;
            case `delete`:
                return 4;

            default:
                return `null`;
        }

    }

    async init(){
        let _contract = new contract();
        this.instance = await _contract.init_contract(_contract.dealAddr, _contract.dealABI);
    }

    async hello(){
        let _word = await this.instance.methods.hello().call();
        return _word;
    }

    async getAllItems() {
        
        if (await isAccountConnected() && await web3.utils.isAddress(await getNowAccount())) {

            try {

                let items = await this.instance.methods.getAllItems().call();
                console.log(items);
                return items;

            } catch (error) {
                console.error(error.message);
                alert('Retrieve failed');
            }

        } else {
            alert(`Detect you haven't connected with web3 extention`);
        }
        
    }

    async getOneItem(itemNo) {
        try {

            if (await isAccountConnected() && await web3.utils.isAddress(await getNowAccount())) {

                try {

                    let item = await this.instance.methods.getOneItem(itemNo).call();
                    console.log(item);
                    return item;

                } catch (error) {
                    console.error(error.message);
                    alert('Retrieve failed');
                    return false;
                }

            } else {
                alert(`Detect you haven't connected with web3 extention`);
            }
        } catch (error) {
            debugger;
        }
    }

    async getMyItems(){

        let userAddress = await getNowAccount();
        if(await isAccountConnected() && await web3.utils.isAddress(userAddress)){
            
            try {
                    
                let items = await this.instance.methods.getMyItems().call({from: userAddress});
                console.log(items);
                return items;
                
            } catch (error) {
                console.error(error.message);
                alert('Retrieve failed');
                return false;
            }
            
        } else {
            alert(`Detect you haven't connected with web3 extention`);
        }
    }

    async createItem(param){
        
        let userAddress = await getNowAccount();
        if(await isAccountConnected() && await web3.utils.isAddress(userAddress)){

            // // est gas
            // let gasEst = await this.instance.methods.createItem(param).estimateGas();
            // gasEst = await web3.utils.fromWei(String(gasEst), 'ether'); // transfer wei to eth
            // console.log('gasEst = ' + gasEst);

            // if (confirm(`Consume estimate gas ${gasEst} ETH`)) {
            // } else {
            //     // do nothing
            // }

            try {
                    
                let receipt = await this.instance.methods.createItem(param).send({ from: userAddress })
                                    .on('transactionHash', function (hash) {
                                        console.log(`tx hash = ${hash}`);
                                    });
                console.log(receipt);

                // using event get item info (NONONONONONONO need time to wait miner)
                // let eventResult = await this.instance.event.createItemEvent({filter: {address: userAddress}, })

                return true;
                
            } catch (error) {
                console.error(error.message);
                alert(`create failed ${error.message}`);
                return false;
            }
            
        } else {
            alert(`Detect you haven't connected with web3 extention`);
        }

        return true;
    }

    async updateItem(param){

        /** check itemNo and price **/
        if(param.itemNo == null || param.itemNo == `` || param.price < 0){
            alert(`update parameters is wrong, check again!`);
            return false;
        }

        let userAddress = await getNowAccount();
        if(await isAccountConnected() && await web3.utils.isAddress(userAddress)){
            
            try {
                    
                let receipt = await this.instance.methods.updateItem(param).send({ from: userAddress })
                                    .on('transactionHash', function (hash) {
                                        console.log(`tx hash = ${hash}`);
                                    });
                console.log(`receipt = ${receipt}`);
                return true;
                
            } catch (error) {
                console.error(error.message);
                alert(`update failed ${error.message}`);
                return false;
            }
            
        } else {
            alert(`Detect you haven't connected with web3 extention`);
        }
    }

    async deleteItem(param){
        debugger;
        /** check itemNo and price **/
        if(param.itemNo == null || param.itemNo == ``){
            alert(`itemNo is empty, check again!`);
            return false;
        }

        let userAddress = await getNowAccount();
        if(await isAccountConnected() && await web3.utils.isAddress(userAddress)){
            
            try {
                    
                let receipt = await this.instance.methods.deleteItem(param).send({ from: userAddress })
                                    .on('transactionHash', function (hash) {
                                        console.log(`tx hash = ${hash}`);
                                    });
                console.log(`receipt = ${receipt}`);
                
            } catch (error) {
                console.error(error.message);
                alert(`delete failed ${error.message}`);
                return false;
            }
            
        } else {
            alert(`Detect you haven't connected with web3 extention`);
        }
    }

}

export class dealMethod{

    async init(){
        const _contract = new contract();
        this.instance = await _contract.init_contract(_contract.dealAddr, _contract.dealABI);
    }

    async buy(itemNo) {

        /** check itemNo **/
        if (itemNo == null || itemNo == ``) {
            alert(`item number is empty, check again!`);
            return false;
        }

        const userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try { debugger;
                // get item info
                const _item = new itemMethod;
                await _item.init();
                let item = await _item.getOneItem(itemNo);

                let receipt = await this.instance.methods.buy(itemNo).send({ from: userAddress, value: String(item.price) });
                console.log(receipt);

            } catch (error) {
                alert(`Deal failed! ${error.message}`);
                return false;
            }

        }
    }

}


async function sendMain(contractInstance) {
    // Configuring the connection to an Ethereum node
    const network = process.env.ETHEREUM_NETWORK;
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        )
    );
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.SIGNER_PRIVATE_KEY
    );
    web3.eth.accounts.wallet.add(signer);
    // Creating the transaction object
    const tx = {
        from: signer.address,
        to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c",
        value: web3.utils.toWei("0.001"),
    };
    // Assigning the right amount of gas
    tx.gas = await web3.eth.estimateGas(tx);

    // Sending the transaction to the network
    const receipt = await web3.eth
        .sendTransaction(tx)
        .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://${network}.etherscan.io/tx/${txhash}`);
        });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
}


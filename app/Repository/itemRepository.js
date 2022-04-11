const {
    contract
} = await import("../Module/contractModule.js");

export class itemRepo {

    async init() {
        let _contract = new contract();
        this.instance = await _contract.init_contract(_contract.dealAddr, _contract.dealABI);
    }

    async hello() {
        let _word = await this.instance.methods.hello().call();
        return _word;
    }

    async getItemOwner(itemNo) {
        try {

            let owner = await this.instance.methods.getItemOwner(itemNo).call();
            console.log(owner);
            return owner;

        } catch (error) {
            console.error(error.message);
            alert('Can not get owner');
            return null;
        }
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
                return false;
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    async getMyItems() {

        let userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try {

                let items = await this.instance.methods.getMyItems().call({
                    from: userAddress
                });
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

    async createItem(itemModel) {

        let userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try {

                let receipt = await this.instance.methods.createItem(itemModel).send({
                        from: userAddress
                    })
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

    async updateItem(param) {

        /** check itemNo and price **/
        if (param.itemNo == null || param.itemNo == `` || param.price < 0) {
            alert(`update parameters is wrong, check again!`);
            return false;
        }

        let userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try {

                let receipt = await this.instance.methods.updateItem(param).send({
                        from: userAddress
                    })
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

    async deleteItem(param) {

        /** check itemNo and price **/
        if (param.itemNo == null || param.itemNo == ``) {
            alert(`itemNo is empty, check again!`);
            return false;
        }

        let userAddress = await getNowAccount();
        if (await isAccountConnected() && await web3.utils.isAddress(userAddress)) {

            try {

                let receipt = await this.instance.methods.deleteItem(param).send({
                        from: userAddress
                    })
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
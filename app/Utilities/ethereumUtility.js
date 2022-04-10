async function accountsChangedHandler(accounts) {
    await loginWithWallet();
}

async function connectHandler(chainId){
    if (await checkChain(chainId)){
        await pageAlter(true);
    } else {
        await pageAlter(false);
    }
}

async function isAccountConnected() {
    
    try {
        const accounts = await web3.eth.getAccounts();

        if (accounts.length == 0) {

            return false;

        } else {

            return true;

        }
    } catch (error) {
        debugger;

        console.error(error.message);
        throw(error.message);
    }
}

async function getNowAccount() {

    try {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
    } catch (error) {
        debugger;
        console.error(error.message);
        throw(error.message);
    }
}

async function checkChain(chainId) {

    // what we are using chain currently
    const usingChain = `0x4`;
    if (chainId == usingChain) {
        return true;
    }

    let _chainId = await ethereum.request({ method: 'eth_chainId' });

    if (usingChain == _chainId) return true;
    else {
        alert(`change to ${await getChainName(usingChain)}`);
        return false;
    }

}

async function pageAlter(boolean) {

    if (boolean) {
        await changeBar(true);
    } else {
        await changeBar(false);
    }

}

async function loginWithWallet() {
    
    if (window.web3) {

        try {

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            if(await isAccountConnected() == false || await checkChain() == false){ await pageAlter(false); return;}

            // save address in browser.
            // window.localStorage.setItem("userAddress", accounts[0]);
            // window.userAddress = accounts[0];
            await pageAlter(true);

        } catch (error) {
            console.error(error.message);
        }

    } else {
        alert("Install MetaMask or other browser extensions.");
    }

}

async function logoutWithWallet() {

    await pageAlter(false);

}

async function getChainName(chainId) {

    // check more on https://chainlist.org/
    switch (chainId) {
        case `0x1`:
            return `Ethereum Main Network`;
        case `0x3`:
            return `Ropsten Test Network`;
        case `0x4`:
            return `Rinkeby Test Network`;
        case `0x5`:
            return `Goerli Test Network`;
        case `0x2a`:
            return `Kovan Test Network`;
        default:
            return ``;
    }

}

async function getWeiFromEther(ether){
    return await web3.utils.toWei(ether, 'ether');
}

async function getEtherfromWei(wei){
    return await web3.utils.fromWei(wei, 'ether');
}
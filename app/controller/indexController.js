window.addEventListener('load', async () => {

    ethereum.on('accountsChanged', async (accounts) => {

        await accountsChangedHandler(accounts);
        location.reload();
        
    });

    // first time to connect
    ethereum.on("connect", async (connectInfo) => {

        await connectHandler(connectInfo);

    });

    ethereum.on('chainChanged', async (chainId) => {

        if (await checkChain(chainId) == false) {
            await pageAlter(false);
        } else {
            await pageAlter(true);
        }

    });

});

$(document).ready(async function () {
    // init features page
    $('#features').load('home.html');

    if (window.ethereum) {

        window.web3 = new Web3(ethereum);

    } else {
        console.error("Install MetaMask or other browser extensions.");
    }

    // BUGSSSSSSSSSS FIX IT
    await changeBar(false);

});

$('#home').click(function () {
    $('#features.child').remove();
    $('#features').load('home.html');
});

$('#connectWallet').on('click', async () => {
    await loginWithWallet();
});

$('#disconnectWallet').on('click', async () => {
    await logoutWithWallet();
});

async function changeBar(addressExist) {
    if (addressExist) {
        
        $('#walletBar').hide();
        $(`#shopBar`).show();
        $('#diswalletBar').show();
        $('#myBar').show();
        $('#addressBar').empty().show().append(`<h3>Your Account - <strong>${await getNowAccount()}</strong></h3>`);

    } else {

        $('#walletBar').show();
        $('#diswalletBar').hide();
        $('#myBar').hide();
        $('#addressBar').empty().hide();
        $(`#shopBar`).hide();

    }
}

function showBlock() {

    let blockUI = document.querySelector(".blockUI");
    let block = document.querySelector('.block');
    let load = document.querySelector('.loading');
    let scrollH = document.documentElement.scrollHeight; //計算整個頁面的高度(含scrollbar)
    let wh = window.innerHeight; //計算可見視窗的高度，用來處理loading圖示的垂直居中
    blockUI.setAttribute('style', `height:${scrollH}px`);
    block.setAttribute('style', `height:${scrollH}px`);
    load.setAttribute('style', `height:${wh}px;text-align: center; line-height:${wh}px`);
    blockUI.setAttribute('style', 'display:inline; z-index:999999');

}

function hideBlock(){

    let blockUI = document.querySelector(".blockUI");
    blockUI.setAttribute('style', 'display:none'); 

}
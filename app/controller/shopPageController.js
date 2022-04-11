async function shopPageInitial(){

    let itemList = JSON.parse(window.localStorage.getItem(`allitems`));

    itemList.forEach( async (item) => {
        
        if (item.status == `open`) {

            $(`#features > div > div `).append(`<div class="col-4 col-6-medium col-12-small">

            <section>
                <a href="#" class="image featured"><img src="/images/SimpleShop.png" alt="" /></a>
                <header>
                    <h3>${item.name}</h3>
                </header>
                <li><strong>price: ${item.price} eth</strong></li>
                <a href="#" class="form-button-submit button icon far fa-paper-plane" onclick="shopPageHappyBuy('${item.itemNo}')">buy it</a>

            </section>

            </div>`);
            
        }
    });

    window.localStorage.clear();

}

async function shopPageController(){

    if (await isAccountConnected() == false) {
        alert (`Detect you haven't connected with web3 extention`);
        return;
    }

    let itemList = await gatAllSrv();

    window.localStorage.setItem(`allitems`, JSON.stringify(itemList));

    $('#features.child').remove();
    $('#features').load('shop.html');
    
}

async function shopPageHappyBuy(itemNo) {

    if (await isAccountConnected() == false) {
        alert (`Detect you haven't connected with web3 extention`);
        return;
    }

    if(itemNo == null || itemNo == `` || itemNo == undefined){ alert(`no item number`); return; }

    //condition the item's owner
    let owner = await getItemOwnerSrv(itemNo);
    if(owner == null) { return; } 
    if(owner == await getNowAccount()) { alert(`You don't buy yourself item 😂`); return; }

    //condition itemInfo is locked or not
    if( await getItemIsLocked(itemNo) ){ alert(`This item is transacting, try later luck to you!!`)}

    //start deal
    let result = await buySrv(itemNo);
    if(result == false) { return; }

    await mystorePageController();

}
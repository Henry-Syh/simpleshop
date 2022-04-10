async function itemPageInitial(itemNo){

    if(itemNo == null || itemNo == `` || itemNo == undefined){ alert(`no item number`); return; }
    
    let itemModel = JSON.parse(window.localStorage.getItem(`aitem`));
    
    $(`input[name*="itemNoU"]`).val(itemModel.itemNo);
    $(`input[name*="itemNameU"]`).val(itemModel.name);
    $(`input[name*="itemPriceU"]`).val(itemModel.price);
    $(`input[name*="itemPicU"]`).val(itemModel.pic);
    $(`select[name*="itemStatusU"]`).val(itemModel.status);

    window.localStorage.clear();
}

async function itemPageController(itemNo){

    if(itemNo == null || itemNo == `` || itemNo == undefined){ alert(`no item number`); return; }

    let item = await getOneSrv(itemNo);

    window.localStorage.setItem(`aitem`, JSON.stringify(item));
    
    $('#features.child').remove();
    $('#features').load('item.html');

}

async function itemPageHappyUpdate(){

    if (await isAccountConnected() == false) {
        alert (`Detect you haven't connected with web3 extention`);
        return;
    }
    
    let itemNo = $(`input[name*="itemNoU"]`).val();
    let itemName = $(`input[name*="itemNameU"]`).val();
    let itemPrice = $(`input[name*="itemPriceU"]`).val();
    let itemPic = $(`input[name*="itemPicU"]`).val();
    let itemStatus = $(`select[name*="itemStatusU"]`).val();

    // inspect parameters
    if (itemName == ``) {alert(`item Name is empty`); return;}
    if (itemPrice < 0 || itemPrice == ``){alert(`item price is lower than 0`); return;}
    
    const { itemModel  } = await import(`../Models/itemModel.js`);
    
    const _itemModel = new itemModel(itemNo, itemName, await getWeiFromEther(itemPrice), itemPic, itemStatus);
    var param = await _itemModel.getModel();

    let item = await getOneSrv(itemNo);

    if(item.itemNo == ``){ alert(`Can't find the product of item number: ${itemNo}`); return; }

    await itemUpdate(param);    
    await itemPageController(param.itemNo);
}
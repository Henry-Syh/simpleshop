function sellPageInitial(){

    $('#features.child').remove();
    $('#features').load('sell.html');
    
}

async function happySale() {

    if (await isAccountConnected() == false) {
        alert (`Detect you haven't connected with web3 extention`);
        return;
    }
    
    let itemNo = $(`input[name*="itemNo"]`).val();
    let itemName = $(`input[name*="itemName"]`).val();
    let itemPrice = $(`input[name*="itemPrice"]`).val();
    let itemPic = $(`input[name*="itemPic"]`).val();
    let itemStatus = $(`select[name*="itemStatus"]`).val();

    // inspect parameters
    if (itemName == ``) {alert(`item Name is empty`); return;}
    if (itemPrice < 0 || itemPrice == ``){alert(`item price is lower than 0`); return;}
    
    const { itemModel  } = await import(`../Models/itemModel.js`);
    
    const _itemModel = new itemModel(itemNo, itemName, await getWeiFromEther(itemPrice), itemPic, itemStatus);
    var param = await _itemModel.getModel();

    await itemCreate(param);

    await mystorePageController();

}
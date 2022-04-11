async function getOwnSrv(){

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    let items = await item.getMyItems();
    hideBlock();

    const { itemModel } = await import(`../Models/itemModel.js`);

    let resultList = []; 
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let model = new itemModel(item.itemNo, item.name, await getEtherfromWei(item.price, 'ether'), item.pic, await parseStatus(item.status));
        resultList[i] = await model.getModel();
                
    }
        
    return resultList;
}

async function gatAllSrv(){

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    let items = await item.getAllItems();
    hideBlock();

    const { itemModel } = await import(`../Models/itemModel.js`);

    let resultList = []; 
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let model = new itemModel(item.itemNo, item.name, await getEtherfromWei(item.price, 'ether'), item.pic, await parseStatus(item.status));
        resultList[i] = await model.getModel();
                
    }
        
    return resultList;

}

async function getOneSrv(itemNo){

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    let aItem = await item.getOneItem(itemNo);
    hideBlock();

    const { itemModel } = await import(`../Models/itemModel.js`);
    let model = new itemModel(aItem.itemNo, aItem.name, await getEtherfromWei(aItem.price, 'ether'), aItem.pic, aItem.status);
    
    return model.getModel();

}

async function getItemOwnerSrv(itemNo) {

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    const item = new itemRepo();
    await item.init();
    return await item.getItemOwner(itemNo);

}

async function getItemIsLocked(itemNo){
    
    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    const _itemRepo = new itemRepo();
    await _itemRepo.init();
    let item = await _itemRepo.getOneItem(itemNo);

    if(item.isLocked) return true;
    else return false;

}
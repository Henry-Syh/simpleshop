async function buySrv(itemNo) {

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    let aItem = await item.getOneItem(itemNo);
    hideBlock();

    // find the item exist or not
    if(aItem == false) return false;
    
    showBlock();
    const { dealRepo } = await import(`../Repository/dealRepository.js`);
    const _dealRepo = new dealRepo();
    await _dealRepo.init();
    let result = await _dealRepo.buyItem(aItem);
    hideBlock();

    return result;

}
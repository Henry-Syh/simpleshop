async function buySrv(itemNo) {

    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    const item = new itemRepo();
    await item.init();
    let aItem = await item.getOneItem(itemNo);

    // find the item exist or not
    if(aItem == false) return false;
    
    const { dealRepo } = await import(`../Repository/dealRepository.js`);
    const _dealRepo = new dealRepo();
    await _dealRepo.init();
    let result = await _dealRepo.buyItem(aItem);

    return result;

}
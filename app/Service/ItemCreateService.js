async function itemCreate(itemModel){
    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    await item.createItem(itemModel);
    hideBlock();
}
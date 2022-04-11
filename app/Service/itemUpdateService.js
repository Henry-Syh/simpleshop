async function itemUpdate(itemModel){
    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    showBlock();
    const item = new itemRepo();
    await item.init();
    await item.updateItem(itemModel);
    hideBlock();
}
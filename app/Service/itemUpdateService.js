async function itemUpdate(itemModel){
    const { itemRepo } = await import(`../Repository/itemRepository.js`);

    const item = new itemRepo();
    await item.init();
    await item.updateItem(itemModel);
}
async function getParam(item){
    const { itemMethod, dealMethod } = await import("./module/contracts.js");
    const _item = new itemMethod;
    await _item.init();

    let ethPrice = web3.utils.fromWei(item.price, 'ether');
    let param = await _item.setParam(items.itemNo, items.name, ethPrice, items.pic, await _item.parseStatus(items.status));
    return param;
}

async function parseStatus(status) {
    switch (status) {
        case `0`:
            return `open`;
        case `1`:
            return `pedding`;
        case `2`:
            return `sold`;
        case `3`:
            return `close`;
        case `4`:
            return `delete`;
        case `open`:
            return 0;
        case `pedding`:
            return 1;
        case `sold`:
            return 2;
        case `close`:
            return 3;
        case `delete`:
            return 4;

        default:
            return `null`;
    }

}
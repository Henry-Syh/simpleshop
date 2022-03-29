const Item = artifacts.require("./Item.sol");

// test on Remix, all done
// off chain can not get returns

contract("Item", async accounts => {
    let _item;

    beforeEach("Initial contract", async () => {
        _item = await Item.deployed();
    });

    it("Create Item", async () => {
        let itemInfo = {
            itemNo: "this is temp no",
            name: "this is item name",
            price: 10,
            pic: "pic",
            status:3,
            ItemArrNo: 0,
            OwnArrNo: 0,
        };
        // ["this is temp no", "this is temp name", 10, "pic", 0, 0, 0]
        // ["this is temp no2", "this is temp name2", 100, "pic", 0, 0, 0]
        // ["item1648471159", "this is temp name3", 1000, "pic", 0, 0, 0]

        // item1648471159 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
        // item1648471601
        let _itemNo1 = await _item.Create(itemInfo, {from:accounts[1]});
        // console.log(_itemNo1);

        // let itemOwn = await _item.itemsOwn.call(accounts[1],0);
        // assert.equal(itemOwn.itemNo, _itemNo1, "Item1 item number error");

        // let itemOne = await _item.itemOne.call(_itemNo1, account[1]);
        // assert.equal(itemOne, itemOwn, "ItemOne param is error");

    });
});
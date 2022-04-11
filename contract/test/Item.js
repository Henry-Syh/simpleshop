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
        
        // ["item1649255614","Name 1",30000000000,"","0",0,"0",false]
        // ["","Name 1",1,"","0",0,"0",false]
        
        let _itemNo1 = await _item.Create(itemInfo, {from:accounts[1]});
        // console.log(_itemNo1);

        // let itemOwn = await _item.itemsOwn.call(accounts[1],0);
        // assert.equal(itemOwn.itemNo, _itemNo1, "Item1 item number error");

        // let itemOne = await _item.itemOne.call(_itemNo1, account[1]);
        // assert.equal(itemOne, itemOwn, "ItemOne param is error");

    });
});
// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0;

import "./helper/Stringhelper.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Item{

    using Stringhelper for string;

    enum itemStatus {
        open, // 0
        pedding, // 1
        sold, // 2
        close, // 3
        del //4
    }
    // ["item1649255614","Name 1",30000000000,"","0",0,"0",false]
    // ["","Name 2",1000000000000000000,"","0",0,"0",false]
    struct itemInfo {
        string itemNo;
        string name;
        uint256 price; //wei
        string pic;
        itemStatus status;
        uint itemsArraySeq;
        uint myItemsMapSeq;
        bool isLocked;
    }

    // Get all items
    itemInfo[] internal itemsArray;

    // Get one item and locked status chk
    // itemNo => itemInfo
    mapping(string => itemInfo) internal itemNoMap;

    // Auth or get item owner address for selling
    // itemNo => item owner
    mapping(string => address) internal itemOwnerMap;

    // Get my all items
    mapping(address => itemInfo[]) internal myItemsMap;

    // EVENT (owner, itemInfo)
    event createItemEvent(address indexed, itemInfo);
    event modifyItemEvent(address indexed, itemInfo);

    // c:create, u:update, d:delete, b:buy, ut:afterTx
    modifier basicCheck(itemInfo memory item, string memory method){
        require(item.name.stringCompare("") == false, "Item name can not leave blank.");
        require(item.price > 0, "Item price can not lower then 0.");

        if(method.stringCompare("u") || method.stringCompare("d")){
            require(itemOwnerMap[item.itemNo] == msg.sender, "This is not your item or item number is wrong.");
        }

        if(method.stringCompare("u") || method.stringCompare("d") || method.stringCompare("b")){
            require(item.itemNo.stringCompare("") == false, "Item number is blank");
            require(itemNoMap[item.itemNo].isLocked == false, "Item is locked, operate later.");
            itemNoMap[item.itemNo].isLocked = true;
        }

        _;

        itemNoMap[item.itemNo].isLocked = false;
    }

    function hello() virtual public pure returns(string memory returnStr) {
        returnStr = "Hello, this is item contract!";
    }

    function getAllItems() public view returns(itemInfo[] memory) {
        return itemsArray;
    }

    function getOneItem(string calldata itemNo) public view returns(itemInfo memory) {
        return itemNoMap[itemNo];
    }

    function getItemOwner(string calldata itemNo) public view returns(address) {
        return itemOwnerMap[itemNo];
    }

    function getMyItems() public view returns(itemInfo[] memory) {
        return myItemsMap[msg.sender];
    }

    function createItem(itemInfo memory item) public basicCheck(item, "c") {
        
        // generate item_no
        string memory itemNo = Stringhelper.concate("item", Strings.toString(block.timestamp), false);

        item.itemNo = itemNo;
        item.itemsArraySeq = itemsArray.length;
        item.myItemsMapSeq = myItemsMap[msg.sender].length;
        item.isLocked = false;

        // create
        emit createItemEvent(msg.sender, item);

        itemsArray.push(item);
        itemNoMap[itemNo] = item;
        itemOwnerMap[itemNo] = msg.sender;
        myItemsMap[msg.sender].push(item);
    }

    function updateItem(itemInfo memory item) public basicCheck(item, "u") {
        emit modifyItemEvent(msg.sender, item);
        uint itemsArraySeq = itemNoMap[item.itemNo].itemsArraySeq;
        uint myItemsMapSeq = itemNoMap[item.itemNo].myItemsMapSeq;

        itemsArray[itemsArraySeq].name = item.name;
        itemsArray[itemsArraySeq].price = item.price;
        itemsArray[itemsArraySeq].pic = item.pic;
        itemsArray[itemsArraySeq].status = item.status;

        itemNoMap[item.itemNo].name = item.name;
        itemNoMap[item.itemNo].price = item.price;
        itemNoMap[item.itemNo].pic = item.pic;
        itemNoMap[item.itemNo].status = item.status;

        myItemsMap[msg.sender][myItemsMapSeq].name = item.name;
        myItemsMap[msg.sender][myItemsMapSeq].price = item.price;
        myItemsMap[msg.sender][myItemsMapSeq].pic = item.pic;
        myItemsMap[msg.sender][myItemsMapSeq].status = item.status;
    }

    function deleteItem(itemInfo memory item) public basicCheck(item, "d") {
        emit modifyItemEvent(msg.sender, item);

        itemsArray[item.itemsArraySeq].status = itemStatus.del;
        
        itemNoMap[item.itemNo].status = itemStatus.del;
        
        myItemsMap[msg.sender][item.myItemsMapSeq].status = itemStatus.del;
    }
}
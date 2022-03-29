// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.8.0;

import "./helper/Stringhelper.sol";
import "./helper/Byteshelper.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Item {
    using Stringhelper for string;
    using Byteshelper for bytes32;

    enum itemStatus {
        open,
        pedding,
        sold,
        close,
        del
    }

    struct itemInfo {
        string itemNo;
        string name;
        uint price;
        string pic;
        itemStatus status;
        uint ItemArrNo;
        uint OwnArrNo;
    }

    mapping(address => itemInfo[]) public itemsOwn;

    // For item, itemNo is unique.(itemNo => (address => item)).
    // Throughout the test, that is ok even though address of (address=>item) is duplicate.
    mapping(string => mapping(address => itemInfo)) public itemOne;

    // For get all item[n][k] k: 0=>itenNo, 1=>itemName
    //It's reverse when def. => item[k][n]
    string[][] itemArray;

    // (owner, itemNo, execute time)
    event createItem(address indexed, string, uint);
    event updateItem(address indexed, string, uint);
    event deleteItem(address indexed, string, uint);

    function Create(itemInfo memory item) public returns(string memory itemNo) {
        // chk item info
        require(false == item.name.stringCompare(""), "item name can not leave blank.");
        require(item.price > 0, "item price can not lower then 0.");

        // generate item_no
        itemNo = Stringhelper.concate("item", Strings.toString(block.timestamp), false);
        item.itemNo = itemNo;
        item.ItemArrNo = itemArray.length;
        item.OwnArrNo = itemsOwn[msg.sender].length;

        // create
        emit createItem(msg.sender, itemNo, block.timestamp);
        itemOne[itemNo][msg.sender] = item;
        itemsOwn[msg.sender].push(item);
        itemArray.push([itemNo,item.name]);
    }

    function ReadItems_ALL() public view returns(string[][] memory) {
        return itemArray;
    }

    function ReadItems_Own() public view returns(itemInfo[] memory) {
        return itemsOwn[msg.sender];
    }

    function Update(itemInfo memory uitem) public {
        // chk
        require(itemOne[uitem.itemNo][msg.sender].itemNo.stringCompare(uitem.itemNo), "This is not your item or item number is wrong.");

        // update
        emit updateItem(msg.sender, uitem.itemNo, block.timestamp);
        (itemsOwn[msg.sender])[uitem.OwnArrNo] = uitem;
        itemOne[uitem.itemNo][msg.sender] = uitem;
        itemArray[uitem.ItemArrNo][1] = uitem.name;
    }

    // after sell
    function Update(itemInfo memory uitem, address seller) public {
        // chk
        require(itemOne[uitem.itemNo][seller].itemNo.stringCompare(uitem.itemNo), "item number is wrong or seller is wrong");

        // update
        emit updateItem(seller, uitem.itemNo, block.timestamp);
        (itemsOwn[seller])[uitem.OwnArrNo] = uitem;
        itemOne[uitem.itemNo][seller] = uitem;
        itemArray[uitem.ItemArrNo][1] = uitem.name;
    }

    function Del(itemInfo memory ditem) public {
        require(itemOne[ditem.itemNo][msg.sender].itemNo.stringCompare(ditem.itemNo), "This is not your item or item number is wrong.");

        // delete
        emit deleteItem(msg.sender, ditem.itemNo, block.timestamp);
        (itemsOwn[msg.sender])[ditem.OwnArrNo].status = itemStatus.del;
        itemOne[ditem.itemNo][msg.sender].status = itemStatus.del;
    }

}
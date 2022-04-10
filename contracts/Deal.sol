// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

import "./Owner.sol";
import "./Item.sol";

contract Deal is Item, Owner{

    event buyLog(address indexed from, address to, uint value, string log);
    event transferLog(address indexed from, address to, uint value, bool isSuccess, string log);

    function hello() override public pure returns(string memory returnStr ){
        returnStr = "Hello, this is deal contract!";
    }

    function buy(string calldata itemNo) public payable {
        
        buyProcess( getOneItem(itemNo), payable(getItemOwner(itemNo)) );
        
    }

    function buyProcess(itemInfo memory item, address payable seller) private basicCheck(item, "b") {

        require(msg.value >= item.price, "Your balance is Insufficient.");
        
        emit buyLog(msg.sender, seller, item.price, item.itemNo);

        transfer(seller, item.price);

        //update
        item.status = itemStatus.close;
        uint itemsArraySeq = itemNoMap[item.itemNo].itemsArraySeq;
        uint myItemsMapSeq = itemNoMap[item.itemNo].myItemsMapSeq;

        itemsArray[itemsArraySeq].status = item.status;
        itemNoMap[item.itemNo].status = item.status;
        myItemsMap[seller][myItemsMapSeq].status = item.status;
        itemOwnerMap[item.itemNo] = msg.sender;

    }

    function transfer(address payable _to, uint price) public payable returns(bool isSuccess, bytes memory data){
        
        if(address(this).balance < price){
            emit buyLog(msg.sender, _to, price, "This value is greater than contract wallet.");
            revert("This value is greater than contract wallet.");
        }
        
        (isSuccess, data) = _to.call {value: price}("");
        emit transferLog(msg.sender, _to, price, isSuccess, "");

    }
}
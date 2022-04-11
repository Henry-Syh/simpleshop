// SPDX-License-Identifier: UNLICENSED
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

    function buyProcess(itemInfo memory item, address payable seller) private buyChk(item, seller) {

        emit buyLog(msg.sender, seller, item.price, item.itemNo);

        transfer(seller, item.price);

        changeItemOwner(item, seller);

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
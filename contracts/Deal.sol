// SPDX-License-Identifier: MIT
pragma solidity >= 0.8 .0;

// import "./Owner.sol";
import "./Item.sol";
import "./helper/Stringhelper.sol";

contract Deal is Item{

    mapping(address=>mapping(address=>uint)) public transactionpMap;

    // (buyer, seller, value)
    event BuyEvent(address, address, uint);

    function buy(address payable seller, string memory itemNo) public payable returns(bool) {
        // chk
        itemInfo memory _itemInfo = itemOne[itemNo][seller];
        require(Stringhelper.stringCompare(_itemInfo.itemNo,""), "Cannot find the item.");
        uint _price = _itemInfo.price*1e18; // WEI
        require(msg.value >= _price, "Your balance is Insufficient.");


        emit BuyEvent(msg.sender, seller, _price);
        transactionpMap[msg.sender][seller] += _price;

        // seller call
        (bool isSuccess, ) = transfer(seller, transactionpMap[msg.sender][seller]);
        transactionpMap[msg.sender][seller] -= _price;

        //update
        _itemInfo.status = itemStatus.sold;
        Item.Update(_itemInfo, seller);

        return isSuccess;
    }

    function transfer(address payable _to, uint price) public payable returns(bool isSuccess, bytes memory data){
        // The price must be wei unit

        require(address(this).balance >= price, "This price is much more than contract wallet.");
        (isSuccess, data) = _to.call {value: price}("");
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
// libraries
const Byteshelper = artifacts.require("Byteshelper");
const Stringhelper = artifacts.require("Stringhelper");

// contracts
const Simpleshop = artifacts.require("Simpleshop");
const Deal = artifacts.require("Deal");
const Item = artifacts.require("Item");
const Owner = artifacts.require("Owner");

module.exports = function (deployer) {
    // lib deploy
    deployer.deploy(Byteshelper);
    deployer.deploy(Stringhelper);

    // lib link contract
    deployer.link(Byteshelper, Item);
    deployer.link(Stringhelper, [Deal, Item]);

    // contract deploy
    deployer.deploy(Simpleshop);
    deployer.deploy(Deal);
    deployer.deploy(Item);
    deployer.deploy(Owner);
}
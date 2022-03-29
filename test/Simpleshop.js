const Simpleshop = artifacts.require("./Simpleshop.sol");

contract("Simpleshop", async accounts => {
    it("should store new string 'AnyWord!'", async () =>{
        const simpleshop = await Simpleshop.deployed();
        await simpleshop.setWord("AnyWord!", { from: accounts[0] });
        const getWord = await simpleshop.wordStr.call();
        assert.equal(getWord, "AnyWord!", "It does not store the word!");
    });
});
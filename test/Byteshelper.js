const Byteshelper = artifacts.require("./helper/Byteshelper.sol");

contract("Byteshelper", async accounts =>{
    it("It will be string", async () => {
        let byteshelper = await Byteshelper.deployed();
        let _bytes = new ArrayBuffer(32);
        _bytes = web3.utils.toHex("This is test word bytes.");

        let result = await byteshelper.bytes32ToString(_bytes, {from: accounts[0]});

        assert.equal(result, "This is test word bytes.", "It is wrong string");
    });

    it("It will be string", async () => {
        let byteshelper = await Byteshelper.deployed();
        let _bytes = new ArrayBuffer(32);
        _bytes = await web3.utils.toHex("這是一個測試");

        let result = await byteshelper.bytes32ToString(_bytes, {from: accounts[0]});

        assert.equal(result, "這是一個測試", "It is wrong string");
    });
});
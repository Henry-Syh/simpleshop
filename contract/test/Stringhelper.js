const Stringhelper = artifacts.require("./helper/Stringhelper.sol");

contract("Stringhelper", async accounts => {
    it("It will same string",async() => {
        let stringhelper = await Stringhelper.deployed();
        let aStr = "abc123";
        let bStr = "abc123";

        let result = await stringhelper.stringCompare(aStr,bStr);

        assert.equal(result, true, "Comparing result is wrong!");
    });

    it("They will be different word", async () => {
        let stringhelper = await Stringhelper.deployed();
        let aStr = "This is item name";
        let bStr = "";

        let result = await stringhelper.stringCompare(aStr,bStr);

        assert.equal(result, false, "Comparing result is wrong!");
    })
})
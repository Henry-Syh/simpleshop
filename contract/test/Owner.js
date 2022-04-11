const Owner = artifacts.require("./Owner.sol");

contract("Owner", async accounts => {
    let _owner;

    beforeEach("setup contract.", async () => {
        _owner = await Owner.deployed();
    });

    it("test the constructor", async () => {
        let _addr = await _owner.owner();

        // expect(await _owner.owner()).to.equal(accounts[2]);
        assert.equal(_addr, accounts[0], "Not account[0]'s address.");
    });

    it("Not owner set transaction fee.", async () => {
        let err = null;
        try {
            await _owner.setTransactionFee(1, {from: accounts[1]});
        } catch (error) {
            err = error;
        }
        assert.ok(err instanceof Error);
    });

    it("Owner set transaction fee.", async () => {
        await _owner.setTransactionFee(1, {
            from: accounts[0]
        });
        let fee = await _owner.transctionFee();
        assert.equal(fee, 1, "Error transaction fee");
    });

    it("Owner withdraw", async () => {
        await _owner.withdraw({from: accounts[0]});
    });

    it("Not owner withdraw", async () => {
        let err = null;
        try{
            await _owner.withdraw({from: accounts[3]});
        } catch (error) {
            err = error;
        }
        assert.ok(err instanceof Error);
    });

    it("contribute", async () => {
        let err = null;

        let balance = await _owner.chkBalance({from:accounts[0]});
        assert.equal(balance, 0, "Error init balance.");

        try{
            await _owner.chkBalance({from:accounts[5]});
        } catch(error) {
            err = error;
        }
        assert.ok(err instanceof Error);

        await _owner.contribute({from: accounts[2], value: 10});
        balance = await _owner.chkBalance({from:accounts[0]});
        assert.equal(balance, 10, "Error contribute amount");

    });
});

/*
(0) 0x2ac1a25ae6702baab42718d6280a08f9f00612e0
(1) 0xde1424b91eda5a9092dd71ab5d3dc9d1b325bb68
(2) 0xa0d4d955ca7419310797e0c57508034c5b643c15
(3) 0x9ff8b20a5db68773d19eb9652956adae8534c322
(4) 0xf36bd26e3ca6a89b4b7b8494a5c7a29d2671c363
(5) 0x068eb8004a14c240ba11586cdff11ba6739a82f4
(6) 0x6f04e3515fdc5f55c3fe0ddef6ee26441a4b2648
(7) 0x132094181c5e7ad4410b7026b05e7d188ebfc75d
(8) 0xe5bf03ab4839bfb81bec05b15682d15085c76cea
(9) 0x30e2a2260f810b27c71802670b4e741ccf2cc033
*/
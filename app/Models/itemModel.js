export class itemModel {

    // constructor(){

    //     this.number;
    //     this.name;
    //     this.price;
    //     this.pic;
    //     this.status;
        
    // }

    constructor(_number, _name, _price, _pic, _status){

        this.number = _number;
        this.name = _name;
        this.price = _price;
        this.pic = _pic;
        this.status = (_status == null || _status == ``) ? 0 : _status;

    }

    async setParam(_number, _name, _price, _pic, _status){
        
        this.number = _number;
        this.name = _name;
        this.price = _price;
        this.pic = _pic;
        this.status = _status;

    }

    async getModelForTest(){

        let param = {
            itemNo: ``,
            name: `item name 1`,
            price: web3.utils.toWei(String(0.52), `ether`),
            pic: `pic.route`,
            status: 0,
            itemsArraySeq: 0,
            myItemsMapSeq: 0,
            isLocked: false
        };
        return param;

    }

    async getModel() {

        let param = {
            itemNo: this.number,
            name: this.name,
            price: this.price, 
            pic: this.pic,
            status: this.status,
            itemsArraySeq: 0,
            myItemsMapSeq: 0,
            isLocked: false
        };
        return param;

    }
}
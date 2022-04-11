var itemModel = require(`../Models/itemsModels`);

exports.getAllItem = function(req, res){
    res.send(`this is getAllItem`);
}

exports.getMyItem = function(req, res){
    res.send(`this is getMyItem`);
}

exports.getOneItem = function(req, res){
    res.send(`this is getOneItem, ${req.params.itemNumber}`);
}

exports.createItem = function(req, res){
    res.send(`this is getOneItem`);
}

exports.updateItem = function(req, res){
    res.send(`this is updateItem`);
}

exports.deleteItem = function(req, res){
    res.send(`this is deleteItem`);
}
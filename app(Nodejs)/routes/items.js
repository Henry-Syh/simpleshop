var express = require('express');
var router = express.Router();

var itemsController = require('../controllers/itemsController');

router.get(`/`, itemsController.getAllItem);

router.get(`/mystore`, itemsController.getMyItem);

router.get(`/:itemNumber`, itemsController.getOneItem);

router.post('/create', itemsController.createItem);

router.post('/update/:itemNumber', itemsController.updateItem);

router.get('/delete/:itemNumber',itemsController.deleteItem);

module.exports = router;
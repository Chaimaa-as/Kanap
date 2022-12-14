const express = require('express');
const router = express.Router(); // appeler au début pour nous permettre de déterminer nos routes

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);// il prend le controleur ....chaque route execute une fonction diff
router.get('/:id', productCtrl.getOneProduct);
router.post('/order', productCtrl.orderProducts);

module.exports = router;
const { Router } = require('express');
const router = Router();

const {
    productsGet,
} = require('../controllers/Product.controller');

router.get('/products' ,productsGet);


module.exports = router;
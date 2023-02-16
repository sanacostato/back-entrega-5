const { response, request } = require('express');
const Product = require('../models/Product.model');

const productsGet = async (req = request, res = response) => {
    try {
        const id = req.query.id;
        let products = null;
        if (id) {
            products = await Product.findById(id);
        } else {
            products = await Product.find();
        }

        res.status(200).json({
            msg: 'succes',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            msg: 'error',
            data: error.message
        });
    }
};

module.exports = {
    productsGet
};
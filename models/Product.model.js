const {Schema, model} = require('mongoose');

const ProductScheema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price:{
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    active: {
        type: Boolean,
        default: true
    },
}, {versionKey: false});

module.exports = model('Product', ProductScheema);
const express = require('express');
const router = express.Router();
const product = require('../controller/product');
const supplier = require('../controller/supplier');
const component = require('../controller/component');


router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'HOMEPAGE'
    });
}); // get all channel

//ENDPOINT PRODUCT
router.get('/getproducts', product.index); // get all products
router.get('/products/:id', product.show); // get products by id
router.post('/products/store', product.store); // create data products
router.put('/products//update/:id', product.update); // update data products by id
router.delete('/products/destroy/:id', product.destroy); // hdelete data products by id

//ENDPOINT SUPPLIER
router.get('/suppliers', supplier.index); // get all products
router.get('/suppliers/:id', supplier.show); // get products by id
router.post('/suppliers/store', supplier.store); // create data products
router.put('/suppliers/:id', supplier.update); // update data products by id
router.delete('/suppliers/:id', supplier.destroy); // hdelete data products by id

//ENDPOINT COMPONENT
router.get('/components', component.index); // get all products
router.get('/components/:id', component.show); // get products by id
router.post('/components/store', component.store); // create data products
router.put('/components/update/:id', component.update); // update data products by id
router.delete('/components/destroy/:id', component.destroy); // hdelete data products by id

module.exports = router;
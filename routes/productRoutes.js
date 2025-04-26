    const express = require('express');
    const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
    const router = express.Router();

    router.post('/products', createProduct);
    router.get('/products', getProducts);
    router.put('/products/:id', updateProduct);  // This route expects an ID parameter
    router.delete('/products/:id', deleteProduct);  // This route expects an ID parameter
    

    module.exports = router;

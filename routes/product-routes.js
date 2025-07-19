const express = require('express'); 
const { getAllProducts, addProducts } = require('../controllers/product-controller');
const router = express.Router(); 

router.get('/all', getAllProducts); 
router.post('/add', addProducts); 

module.exports = router;
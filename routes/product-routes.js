const express = require('express'); 
const { getAllProducts, addProducts, getProductStats } = require('../controllers/product-controller');
const router = express.Router(); 

router.get('/all', getAllProducts); 
router.post('/add', addProducts); 
router.get('/stats', getProductStats);

module.exports = router;
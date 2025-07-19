const Product = require('../models/Product'); 

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find(); 

        if(products?.length > 0) {
            res.status(200).json({
                success: true, 
                message: 'Products fetched successfully!', 
                data: products
            });
        }
        else {
            res.status(400).json({
                success: false, 
                message: 'No book found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again.'
        });
    }
}

const addProducts  = async(req, res) => {
    try {
        const formData = req.body; 
        const newProduct = await Product.create(formData); 

        if(!newProduct) {
            return res.status(400).json({
                success: false, 
                message: 'Error adding product. Please try again!'
            });
        }
        res.status(200).json({
            success: true, 
            message: 'Product added successfully!', 
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong. Please try again!', 
            error: error.message
        });
    }
}

module.exports = {
    getAllProducts, 
    addProducts
}
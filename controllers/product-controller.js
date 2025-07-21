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

const getProductStats = async(req, res) => {
    try {
        const result = await Product.aggregate([
            //match the documents that are in stock and price greater than 100
            {
              $match: {
                inStock: true, 
                price: {
                    $gte: 100
                }
              }  
            },
            //group the documents based on category and calculate avg price for that category and the number of products in each category
            {
                $group: {
                    _id: "$category", 
                    avgPrice: {
                        $avg: "$price"
                    }, 
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true, 
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong. Please try again!', 
            error: error.message
        });
    }
}

const getProductAnalysis = async(req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    category: 'Electronics'
                }
            }, 
            {
                $group: {
                    _id: null, 
                    totalRevenue: {
                        $sum: "$price"
                    },
                    averagePrice: {
                        $avg: "$price"
                    }, 
                    maxProductPrice: {
                        $max: "$price"
                    }, 
                    minProductPrice: {
                        $min: "$price"
                    }
                }
            }, 
            {
                $project: { // 0 and 1 are boolean 
                    _id: 0, 
                    totalRevenue: 1, 
                    averagePrice: 1, 
                    maxProductPrice: 1, 
                    minProductPrice: 1, 
                    priceRange: {
                        $subtract: ["$maxProductPrice", "$minProductPrice"]
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true, 
            data: result
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
    addProducts,
    getProductStats, 
    getProductAnalysis
}
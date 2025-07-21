const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async(req, res) => {
    try {
        const author = req.body; 
        const newAuthor = await Author.create(author); 

        if(!newAuthor) {
            return res.status(400).json({
                success: false,
                message: 'Could not create author'
            });
        }
        res.status(201).json({
            success: true, 
            message: 'Author created successfully!', 
            data: newAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again', 
            error: error.message
        });
    }
}

const createBook = async(req, res) => {
    try {
        const book = await Book.create(req.body); 
        if(!book) {
            return res.status(400).json({
                success: false, 
                message: "Could not add book!"
            });
        }
        res.status(201).json({
            success: true, 
            message: 'Book added successfully!', 
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again', 
            error: error.message
        });
    }
}

const getBookWithAuthor = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');

        if(!book) {
            return res.status(400).json({
                success: false, 
                message: 'Book not found!'
            });
        }
        res.status(200).json({
            success: true, 
            message: 'Book found!', 
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Something went wrong! Please try again', 
            error: error.message
        });
    }
}

module.exports = {
    createAuthor, 
    createBook,
    getBookWithAuthor
}
require("dotenv").config();
const express = require('express'); 
const connectToDB = require("./db/db");
const app = express(); 
const productRoutes = require('./routes/product-routes');
const bookRoutes = require('./routes/book-routes');

const PORT = process.env.PORT || 3000; 

connectToDB();

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/reference', bookRoutes);

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});
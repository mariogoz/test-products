//Sample Mongoose Schema (Person class)  
const mongoose = require('mongoose'),  
Schema = mongoose.Schema;  
  
var productsSchema = new Schema({  
    id: Number,  
    brand: String,
    description: String,
    image: String,
    price: Number
});
  
module.exports = mongoose.model('products', productsSchema); 
const express = require('express');
const app = express();
const parser = require('body-parser');
const mongo = require('./src/common/mongo');
const port = 3000;

const products = require('./src/controllers/products');
const searchProducts = require('./src/middlewares/products/searchProducts');

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

const product = products();
app.get('/:filter', searchProducts, product.get);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const products = () => ({
    get: async (req, res) => {
        const products = res.locals.result;
        const isPalindromic = res.locals.isPalindromic;
        let response = {
          discount: isPalindromic,
          products: []
        }
        products.forEach( ( {id, brand, description, image, price}) => {
          response.products.push({
            id,
            brand,
            description,
            image,
            price
          });
        });
        res.status(200).send(response);
    }
});

module.exports = products;
const productService = require('../service/productService')


module.exports.createProduct = async (req, res) =>
{
  const serviceResponse = await productService.createProduct(req.body);
}
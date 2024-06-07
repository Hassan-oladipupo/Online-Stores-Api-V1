const productService = require('../service/productService');
const constants = require('../constants');

//Handle created product response  from the service
module.exports.createProduct = async (req, res) =>
{
  let response = {...constants.defaultServerResponse }; 
  try {
    const responseFromService = await productService.createProduct(req.body);
    response.status = 200;
    response.message = constants.productMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: createProduct', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

//Handle retrieve all product response from the services
module.exports.getAllProducts = async (req, res) =>
  {
    let response = {...constants.defaultServerResponse }; 
    try {
      const responseFromService = await productService.getAllProducts(req.query);
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_FETCHED;
      response.body = responseFromService;
    } catch (error) {
      console.log('Something went wrong: Controller: createProduct', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }

//Handle retrieved productById response from the services
  module.exports.getProductById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
      const responseFromService = await productService.getProductById(req.params);
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_FETCHED;
      response.body = responseFromService;
    } catch (error) {
      console.log('Something went wrong: Controller: getProductById', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }


  //Handle product updated response from the services
  
  module.exports.updateProduct = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
      const responseFromService = await productService.updateProduct({
        id: req.params.id,
        updateInfo: req.body
      });
      response.status = 200;
      response.message = constants.productMessage.PRODUCT_UPDATED;
      response.body = responseFromService;
    } catch (error) {
      console.log('Something went wrong: Controller: updateProduct', error);
      response.message = error.message;
    }
    return res.status(response.status).send(response);
  }
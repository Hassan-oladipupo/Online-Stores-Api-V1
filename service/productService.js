const Product = require('../database/models/productModel');
const mongoDbDataFormat = require('../helper/dbHelper');
const constants = require('../constants')




//Create  product 
module.exports.createProduct = async (serviceData) => {
    try {
      let product = new Product({ ...serviceData });
      result =  await product.save();
      return mongoDbDataFormat.formatMongoData(result);
      
    } catch (error) {
      console.log('Something went wrong: Service: createProduct', error);
      throw new Error(error);
    }
  }

//Get all product with pagination implemented

  module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
    try {
      let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit));
      return mongoDbDataFormat.formatMongoData(products);
    } catch (error) {
      console.log('Something went wrong: Service: getAllProducts', error);
      throw new Error(error);
    }
  }



  //Get productById
  module.exports.getProductById = async ({ id }) => {
    try {
      mongoDbDataFormat.checkObjectId(id)
      let product = await Product.findById(id);
      if (!product) {
        throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(product);
    } catch (error) {
      console.log('Something went wrong: Service: getProductById', error);
      throw new Error(error);
    }
  }


  //Update Existing product
  module.exports.updateProduct = async ({ id, updateInfo }) => {
    try {
      mongoDbDataFormat.checkObjectId(id);
      let product = await Product.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      )
      if (!product) {
        throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
      }
      return mongoDbDataFormat.formatMongoData(product);
    } catch (error) {
      console.log('Something went wrong: Service: updateProduct', error);
      throw new Error(error);
    }
  }
  
  


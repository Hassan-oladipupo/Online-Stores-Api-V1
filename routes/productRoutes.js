const express = require("express");
const router = express.Router();
const productController = require('../Controller/productController')
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');


// Create product route 
router.post('/', 
joiSchemaValidation.validateBody(productSchema.createProductSchema),
productController.createProduct
);


// Get all product route
router.get('/',
 joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema), 
productController.getAllProducts
);

// Get all productById route
router.get('/:id',
    productController.getProductById
  );


  //Update product routes
  router.put('/:id',
    joiSchemaValidation.validateBody(productSchema.updateProductSchema),
    productController.updateProduct
  );


  //delete product 
  router.delete('/:id',
    productController.deleteProduct
  )

  
module.exports = router;    
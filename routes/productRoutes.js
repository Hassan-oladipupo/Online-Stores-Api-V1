const express = require("express");
const router = express.Router();
const productController = require('../Controller/productController')
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');
const tokenValidation = require('../middleware/tokenValidation')


// Create product route 
router.post('/', 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(productSchema.createProductSchema),
productController.createProduct
);



// Get all product route
router.get('/',
tokenValidation.validateToken,
 joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema), 
productController.getAllProducts
);

// Get all productById route
router.get('/:id',
    tokenValidation.validateToken,
    productController.getProductById
  );


  //Update product routes
  router.put('/:id',
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(productSchema.updateProductSchema),
    productController.updateProduct
  );


  //delete product 
  router.delete('/:id',
    tokenValidation.validateToken,
    productController.deleteProduct
  )

  
module.exports = router;    
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct } = require('../controllers/products.controller');

const { existCategoryById, existPoductById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/Products
 */

//get all products - public
router.get('/', getProducts);

//get product by id - public
router.get('/:id', [
    check('id', 'it is not a valid Id').isMongoId(),
    check('id').custom(existPoductById),
    validateFields,
], getProductById);

// add category - private - any person with a valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('category', 'Is not a mongo valid id').isMongoId(),
    check('category').custom(existCategoryById),
    validateFields
], addProduct);

// update product - private - any person with a valid token
router.put('/:id', [
    validateJWT,
    // check('category','It is not a valid mongo Id').isMongoId(),
    check('id').custom(existPoductById),
    validateFields
], updateProduct);

// delete category - Admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid mongo id').isMongoId(),
    check('id').custom(existPoductById),
    validateFields,
], deleteProduct);


module.exports = router;
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory, 
    deleteCategory } = require('../controllers/categories.controller');

const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'it is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], getCategoryById);

router.post('/', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    validateFields
], addCategory);


router.put('/:id', [
    validateJWT,
    check('name', 'Name is mandatory').not().isEmpty(),
    check('id').custom(existCategoryById),
    validateFields
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'it is not a valid id').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
], deleteCategory);

module.exports = router;
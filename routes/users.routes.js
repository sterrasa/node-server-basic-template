
const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, emailExist, existUserById } = require('../helpers/db-validators');
const { validateFields, validateJWT, hasRole } = require('../middlewares');

const { userGet,
    userPost,
    userPut,
    userDelete,
    userPatch } = require('../controllers/users.controller');


const router = Router();


router.get('/', userGet);

router.put('/:id', [
    check('id', 'Is not a valid Id').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.post('/',
    [check('name', "Name can not be empty").not().isEmpty(),
    check('password', "Is not a valid password, min length six charcters").isLength({ min: 6 }),
    //check('role', "Is not a valid role, must be admin or user").isIn(["ADMIN","USER"]),
    check('email').custom(emailExist),
    check('role').custom(isValidRole),
        validateFields],
    userPost);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(existUserById),
    validateFields],
    userDelete);

router.patch('/', userPatch);


module.exports = router;
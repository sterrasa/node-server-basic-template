
const { Router } = require('express');
const { check } = require('express-validator');
const { doLogin, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [
    check('email', "email is mandatory").isEmail(),
    check('password', "password is mandatory").not().isEmpty(),
    validateFields
], doLogin)

router.post('/google', [
    check('id_token', "token is mandatory").not().isEmpty(),
    validateFields
], googleSignIn)



module.exports = router;
const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt-generator');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const doLogin = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });
        }
        if (!user.status) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User or Password are not correct password'
            });
        }
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });


    } catch (error) {
        res.status(500).json({ msg: 'error in authentication', error });
    }
}


module.exports = {
    doLogin
}
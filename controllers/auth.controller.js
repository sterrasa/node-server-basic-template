const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt-generator');
const bcryptjs = require('bcryptjs');
const { User }  = require('../models');
const { googleVerify } = require('../helpers/google-verify-token');


const doLogin = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });x
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
                msg: 'User or Password are not correct'
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

const googleSignIn = async (req = request, res = response) => {

    try {
        const { id_token } = req.body;
        const { name, email, img } = await googleVerify(id_token);

        let user = await User.findOne( {email});
        if(!user) {
            user = new User({
                name,
                email,
                role: 'USER_ROLE',
                password: ':(',
                img,
                google: true
            });
            await user.save();
        }
        if(!user.status) {
            return res.status(401).json({
                msg: 'User is not active - Please contact the administrator'
            });
        }

        const token = await generateJWT(user.id);
        return res.json({ user, token });
    } catch (error) {
        res.status(500).json({ msg: 'Token could not be verify', error });
    }
}

module.exports = {
    doLogin,
    googleSignIn
}
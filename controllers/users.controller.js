
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( from ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        users
    });
}

const userPost = async (req, res = response) => {

    const { name, email, password, role  } = req.body;
    const user = new User( { name, email, password, role } );
    //hash password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    //save user
    await user.save();

    res.json({
        user
    });
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    if ( password ) {
        // hash password
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - user patch'
    });
}

const userDelete = async (req, res = response) => {
    const { id } = req.params;

    //  Permanent delete
    // const usuario = await Usuario.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { status: false } );

    res.json(user);
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}
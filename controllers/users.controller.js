const { response, request } = require('express');


const userGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const userPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - user post ',
        nombre, 
        edad
    });
}

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - user put',
        id
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - user patch'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - user delete'
    });
}




module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}
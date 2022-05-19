const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const findUsers = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term ); // TRUE 

    if ( isMongoID ) {
        const user = await User.findById(term);
        return res.json({
            results: [ user ] || []
        });
    }
    //expression to find no sensitive
    const regex = new RegExp( term, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });

    res.json({
        results: users
    });

}

const findCategories = async( term = '', res = response ) => {

    //check mongo id
    const isMongoID = ObjectId.isValid( term ); // TRUE 

    if ( isMongoID ) {
        const category = await Category.findById(term);
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const categories = await Category.find({ name: regex, status: true });

    res.json({
        results: categories
    });

}

const findProducts = async( term = '', res = response ) => {

    const isMongoID = ObjectId.isValid( term ); // TRUE 

    if ( isMongoID ) {
        const product = await Product.findById(term)
                            .populate('category','name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( term, 'i' );
    const products = await Product.find({ name: regex, status: true })
                            .populate('category','name')

    res.json({
        results: products
    });

}


const search = ( req, res = response ) => {
    
    const { colection, term  } = req.params;

    if ( !allowedCollections.includes( colection ) ) {
        return res.status(400).json({
            msg: `Allowed collection are: ${ allowedCollections }`
        })
    }

    switch (colection) {
        case 'users':
            findUsers(term, res);
        break;
        case 'categories':
            findCategories(term, res);
        break;
        case 'products':
            findProducts(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'Search not added'
            })
    }

}

module.exports = {
    search
}
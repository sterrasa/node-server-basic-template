const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`Role: ${role}, does not exist`);
    }
}

const emailExist = async (email) => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`Email: ${email}, already exist`);
    }
}

const existUserById = async( id ) => {
    const userExist = await User.findById(id);
    if ( !userExist ) {
        throw new Error(`Id doesn't exist ${ id }`);
    }
}

/**
 * Categories
 */
 const existCategoryById = async( id ) => {

    const existCategory = await Category.findById(id);
    if ( !existCategory ) {
        throw new Error(`id doesn't exist ${ id }`);
    }
}

/**
 * Products
 */
const existPoductById = async( id ) => {

    const existProduct = await Product.findById(id);
    if ( !existProduct ) {
        throw new Error(`Id doesn't exist ${ id }`);
    }
}

module.exports = {
    isValidRole,
    emailExist,
    existUserById,
    existCategoryById,
    existPoductById
}
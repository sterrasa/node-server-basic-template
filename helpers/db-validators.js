const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    isValidRole,
    emailExist,
    existUserById
}
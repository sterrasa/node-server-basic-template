const { response } = require('express')


const isAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'you need verify token first'
        });
    }

    const { role, name } = req.user;
    
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not admin`
        });
    }

    next();
}


const hasRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'you need verify token first'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            console.log(req.user.role);
            return res.status(401).json({
                msg: `is not a valid role`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}
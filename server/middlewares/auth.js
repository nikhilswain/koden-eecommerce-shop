const jwt =  require('jsonwebtoken');

// check if user is authenticated
function isAuthenticated(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    throw {
                        msg: 'Invalid token',
                        status: 401
                    }
                }
                req.user = decoded;
                next();
            });
        } else {
            throw {
                msg: 'No token provided',
                status: 401
            }
        }
    } catch (error) {
        console.log(error);
        res.status(error.status).json({
            message: error.msg
        });
    }
}

//  check if user is admin
function isAdmin(req, res, next) {
    if (req.user.userType === 'admin') {
        next();
    }  else {
        res.status(403).json({
            message: 'User not admin'
        });
    }
}

//  check if user is manager
function isManager(req, res, next) {
    if (req.user.userType === 'manager') {
        next();
    }  else {
        res.status(403).json({
            message: 'User not manager'
        });
    }
}

//  check if user is from internal team
function isInternal(req, res, next) {
    if (req.user.userType === 'admin' || req.user.userType === 'manager') {
        next();
    }  else {
        res.status(403).json({
            message: 'User not authorized'
        });
    }
}

module.exports = { isAuthenticated, isAdmin, isManager, isInternal };
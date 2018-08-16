import jwt from "express-jwt";

module.exports = jwt({secret: process.env.JWT_SECRET || ''}).unless({
    path: [
        '/',
        '/authenticate/',
        '/users/registration/',
        '/clients/registration/',
     ]
});


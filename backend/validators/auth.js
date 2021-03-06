const {check} = require('express-validator');

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name Is Required'),
        
    check('email')
        .isEmail()
        .withMessage('Must Be A Valid Email Address'),
    
    check('password')
        .isLength({min: 6})
        .withMessage('Password Must Be At Least Six Charaters Long')
];


exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must Be A Valid Email Address'),
    
    check('password')
        .isLength({min: 6})
        .withMessage('Password Must Be At Least Six Charaters Long')
]; 
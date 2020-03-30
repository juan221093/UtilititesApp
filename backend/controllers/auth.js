const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt =  require('express-jwt')


exports.signup = (req, res) => {
   User.findOne({email: req.body.email}).exec((err, user) =>{ 
        if(user){
            return res.status(400).json({
                error: 'Email Is Taken'
            })
        }

        const{name, email, password} = req.body
        let username = shortId.generate()
        let profile =  `${process.env.CLIENT_URL}/profile/${username}`
        let newUser = new User({name, email, password, profile, username})
        newUser.save((err, success) =>{
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            // res.json({
            //     user: success
            // });

            res.json({
                message: 'Signup Successful!! Please Signin.'
            });
        });
        

   });
};

exports.signin = (req, res) => {

    const{email, password} = req.body

    //check if user exists
    User.findOne({email}).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist, please SIGNUP'
            });
        }
        //authenticate 
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and Password DO NOT MATCH'
            });

        }

        //generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {expiresIn: '1d'})
        const {_id, username, name, email, role} = user;
        return res.json({
            token,
            user: {_id, username, name, email, role}
        });


    });


};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Signout Successful'
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
});

//Find User else Error
exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id
    User.findById({_id: authUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User Not Found'
                
            });
        }

        req.profile = user
        next()
    });
};

//Find Admin User else Error
exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id
    User.findById({_id: adminUserId}).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User Not Found'
                
            });
        }

        if(user.role != 1){

            return res.status(400).json({
                error: 'Admin Resource not Found. ACCESS DENIED.'
                
            });

        }

        req.profile = user;
        next();
    });
};


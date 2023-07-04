const payload = require("../utility/globalFunction");
const jwt = require('jsonwebtoken');
const userModel = require("../models/auth");
const tokenModel = require("../models/token");

const globalMessage = require("../utility/globalMessage");


const { check, body, query, oneOf, header, validationResult } = require('express-validator');

function validation(req, res, next) {
    var errorValidation = validationResult(req);
    if (errorValidation.errors.length > 0) {
        return payload.resPayloadMessage(400, true, errorValidation.errors[0].msg, res);
    }
    next()
}

const verifyUser = [
    body('emailAddress').exists().withMessage('Email Address is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('phoneNumber').exists().withMessage('Phone number is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const register = [
    body('emailAddress').exists().withMessage('Email Address is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('phoneNumber').exists().withMessage('Phone number is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    // body('firstName').exists().withMessage('firstName number is required').trim(),
    // (req, res, next) => {
    //     validation(req, res, next);
    // },
    body('fullName').exists().withMessage('firstName number is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('password').exists().withMessage('Password is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    body('businessName').exists().withMessage('businessName is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },   
]

const login = [ 
    body('emailAddress').exists().withMessage('emailAddress is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }, 
    body('password').exists().withMessage('Password is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
]


const resetPassword = [ 
    body('user').exists().withMessage('User is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    }
]

const getToken = [
    header('Authorization').exists().withMessage('Authorization is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
    async (req, res, next) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let Token  =  req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
            let data = {};
            data.userID = decoded.userID
            try {
                const result = await tokenModel.getToken(data);
                if (result.data.length === 0) {
                    res.status(401).json({ error: true, message: globalMessage.AuthorizationNotFound })
                } else if (result.data[0].expire_at < new Date() || Token !== result.data[0].accessToken) {
                    res.status(401).json({ error: true, message: globalMessage.AuthorizationExpire })
                } else {
                    req.query.userID = decoded.userID
                    next();
                }
            } catch (error) {
                res.status(403).json({ error: true, message: error.message })
            }
        } else {
            res.status(403).json({error : true, message : globalMessage.AuthorizationNotSupported})
        }
    }
]

const refreshToken = [ 
    body('token').exists().withMessage('Token is required').trim(),
    (req, res, next) => {
        validation(req, res, next);
    },
]

module.exports = {
    verifyUser,
    login,
    resetPassword,
    refreshToken,
    getToken,
    register
}
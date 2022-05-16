const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");
const constants = require("../utils/constants");

function signup(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for signup"
    };
    if(data.username && data.password) {
        User.Signup(data, function(err1, result1) {
            if(err1) {
                console.log(err1);
                return res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "Successfully signed up";
            responseData.data = {
                username: data.username
            };
            return res.status(201).send(responseData);
        });
    }
    else {
        return res.status(400).send(responseData);
    }
}

function login(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for signin"
    };
    if(data.username && data.password) {
        User.Login(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "Error in signin";
                return res.status(500).send(responseData);
            }
            if(result[0].errorCode == constants.errorCodes.invalidUser) {
                responseData.msg = "Invalid User";
                return res.status(200).send(responseData);
            }
            if(result[0].errorCode == constants.errorCodes.invalidPassword) {
                responseData.msg = "Invalid Password";
                return res.status(200).send(responseData);
            }
            const token = jwt.sign({id : 1},authConfig.secret,{expiresIn:600} )
            responseData.success = true;
            responseData.msg = "Successfully logged in ";
            responseData.data = {
                username: result[0].username,
                authToken: token
            };
            return res.status(200).send(responseData);
        })
    } else {
        return res.status(400).send(responseData);
    }
}

module.exports = {signup, login};
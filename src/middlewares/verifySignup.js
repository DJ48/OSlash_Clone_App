/**
 *  This file will contain middleware for 
 *  verifying the request body
 */

 const User = require("../models/user.model");
 
 validateSignupRequest = (req,res,next)=>{
    //Validate if the UserName exists
    data=req.body;
    if(!req.body.username){
        return res.status(400).send({
            message : "Failed ! Username is not Provided"
        })
    }
 
    //Validate if the password exists
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password is not Provided"
        })
    }
 
    //Validate if the username already present
    User.getUsersSignupDetails(data, function(err, result) {
        if(err) {
            console.log(err);
            responseData.msg = "Error in signup";
            return res.status(500).send(responseData);
        }
        if(result.length > 0) {
            return res.status(400).send({
                message : "Failed ! User Already exists"
            })
        } 
        else{
            next();
        }
    })
 }
 
 module.exports = {
     validateSignupRequest : validateSignupRequest
 }
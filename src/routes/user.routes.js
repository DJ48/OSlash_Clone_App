/**
 * This file will act as the route for authentication and authorization
 */

// define the routes - REST endpoints for user registration

const userController = require("../controllers/user.controller");
const {verifySignup} = require("../middlewares");
module.exports = (app)=>{
    app.post("/oslash/api/v1/auth/signup", verifySignup.validateSignupRequest, userController.signup);
    app.post("/oslash/api/v1/auth/signin", userController.login);

}
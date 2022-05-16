const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");

function Signup(data, cb) {
    let sql = `INSERT INTO user_t
    (username, password, createdAt, updatedAt)
    Values (? , ? , now(), now())`;
    let values = [];
    values.push(data.username);
    bcrypt.hash(data.password, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    });
}

function Login(data, cb) {
    let sql = `SELECT id, username, password 
               FROM user_t WHERE 
               username = ?`;
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        if(result.length == 0){
            cb(err,[{errorCode : constants.errorCodes.invalidUser}]);
            return;
        }
        const isValidPass = bcrypt.compareSync(data.password, result[0].password);
        if(isValidPass) {
            cb(err, result);
        } else {
            cb(err, [{errorCode : constants.errorCodes.invalidPassword}]);
        }
    });
}

function getUsersSignupDetails(data, cb) {
    let sql = "SELECT id FROM user_t WHERE username = ?";
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {Signup, Login, getUsersSignupDetails};
const express = require("express");
const serverConfig = require("./src/configs/server.config");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




require('./src/routes/user.routes')(app);
// require('./routes/user.routes')(app);
// require('./routes/ticket.routes')(app);

//Start The server
app.listen(serverConfig.PORT,()=>{
    console.log("Server Started on the port: "+ serverConfig.PORT);
})
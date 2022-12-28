const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const userRouts = require("./Routs/userRounts")

require('dotenv').config()

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions)); 
app.use(express.json()); 

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connetion Successfull");
  }).catch((err) => {
    console.log(err.message);
  });

app.use("/api/user",userRouts);


app.listen(4000,console.log("server started")); 



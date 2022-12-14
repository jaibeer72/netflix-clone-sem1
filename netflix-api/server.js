const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const userRouts = require("./Routs/userRounts");
const suggestRouts = require("./Routs/ReccmondationRouts");

require('dotenv').config()

const app = express();

// some credential issues needed to be fixed i don't like the manual port entry ill fix it if needed
const corsOptions ={
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
app.use("/api/suggest",suggestRouts);


app.listen(4000,console.log("server started")); 



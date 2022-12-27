const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose"); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.listen(4000,console.log("server started")); 
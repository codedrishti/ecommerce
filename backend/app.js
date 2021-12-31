const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMidleware = require("./middleware/error");

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
     require("dotenv").config({path: "backend/config/config.env"});
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
app.use("/api/v1/", product);

const user = require("./routes/userRoute");
app.use("/api/v1/", user);

const order = require("./routes/orderRoute");
app.use("/api/v1/", order);

const payment = require("./routes/paymentRoute");
app.use("/api/v1/", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get("*", (req, res)=>{
     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

//Middleware for Error Handling
app.use(errorMidleware);

module.exports = app;
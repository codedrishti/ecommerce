const { object } = require("webidl-conversions");
const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Internal Server Error";


     //CastError: Wrong MongoDB ID/Data Error
     if(err.name === "CastError"){
          const message = `Resource not found. Invailid: ${err.path}`;
          err = new ErrorHandler(message, 400);
     }

     //Mongoose Duplicate Key Error
     if(err.code === 11000){
          const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
          err = new ErrorHandler(message, 400);
     }

     //Handle JWT Error
     if(err.code === "JsonWebTokenError"){
          const message = `Json web token is invailid, Try again`;
          err = new ErrorHandler(message, 400);
     }

     //JWT Expire Error
     if(err.code === "TokenExpiredError"){
          const message = `Json web token is Expired, Try again`;
          err = new ErrorHandler(message, 400);
     }

     res.status(err.statusCode).json({
          success: false,
          message: err.message,
     });
};

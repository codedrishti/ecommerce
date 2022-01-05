const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception
process.on("uncaughtException", (err)=>{
     console.log(`Error: ${err.message}`);
     console.log(`Shuting down the server due to the Uncaught Exception`);

     process.exit(1);
})

//config
dotenv.config({path: "backend/config/config.env"});

//connecting database
connectDatabase();

cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
});


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
     console.log(`Server working on http://localhost:${PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
     console.log(`Error: ${err.message}`);
     console.log(`Shutting down the server due to Unhandled Promise Rejection`);

     Server.close(()=>{
          process.exit(1);
     });
});
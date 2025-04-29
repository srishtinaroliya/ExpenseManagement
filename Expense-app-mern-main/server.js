const express = require('express');
const cors = require('cors');
const morgan  =require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path=require('path');
dotenv.config();
const connectDb = require('./config/connectDb');
//config dot env file

//database call
connectDb();
//rest Object
const app=express();
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users",require("./routes/userRoute"));
//transactions routes
app.use('/api/v1/transactions',require('./routes/TransactionRoutes'));

//static files
app.use(express.static(path.join(__dirname,'./client/build')));


app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});
//port
const PORT=8080||process.env.PORT;
//listen server
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);

});
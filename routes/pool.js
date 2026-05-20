// const mongoose = require("mongoose");

// var pool=()=>{
//     mongoose.Promise = global.Promise;
//     var options={}
    
//     mongoose.connect(
//         `mongodb://127.0.0.1:27017/productdetails?retryWrites=true&w=majority`,   
//          options
//        );

//        mongoose.connection.
//        once("open", () => console.log("MongoDb running"))
       
//        .on("error", (err) => console.log(err));
    
//    };




// module.exports=pool

const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.ATLASDB_URL;
// console.log("connection String :::::",dbUrl);

const pool = async () => {
    try {

        await mongoose.connect(dbUrl);

        console.log("MongoDB Connected");

    } catch (err) {

        console.log("Database Error:", err);

    }
};

module.exports = pool;
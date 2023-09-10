const mongoose = require("mongoose");

var pool=()=>{
    mongoose.Promise = global.Promise;
    var options={}
    
    mongoose.connect(
        `mongodb://127.0.0.1:27017/productdetails?retryWrites=true&w=majority`,   
         options
       );

       mongoose.connection.
       once("open", () => console.log("MongoDb running"))
       
       .on("error", (err) => console.log(err));
    
   };




module.exports=pool
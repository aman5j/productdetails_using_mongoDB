var mongoose = require('mongoose');
var typesSchema = mongoose.Schema({

    adminname:{
        type:String,
        require:true
    },

    emailid:{
        type:String,
        require:true
    },

    mobileno:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    },

    picture:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("admins", typesSchema)

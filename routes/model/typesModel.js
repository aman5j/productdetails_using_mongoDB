const mongoose = require('mongoose')
var typesSchema = mongoose.Schema({
    producttypename:{ type:String,
    require:true
    }
})

module.exports = mongoose.model("producttype", typesSchema)

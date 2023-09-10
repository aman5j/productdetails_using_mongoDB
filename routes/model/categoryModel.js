const mongoose = require('mongoose')
var typesSchema = mongoose.Schema({
    producttypeid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"producttype"
    },
    productcategoryname:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("productcategory", typesSchema)

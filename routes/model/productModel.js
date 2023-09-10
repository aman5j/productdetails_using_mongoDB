const mongoose = require('mongoose')
var typesSchema = mongoose.Schema({
    producttypeid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"producttype"
    },

    productcategoryid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"productcategory"
    },

    description:{
        type:String,
        require:true
    },

    price:{
        type:Number,
        require:true
    },

    offer:{
        type:Number,
        require:true
    },

    quantity:{
        type:Number,
        require:true
    },

    quantitytype:{
        type:String,
        require:true
    },

    productpicture:{
        type:String,
        require:true
    },

    productname:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model("products", typesSchema)

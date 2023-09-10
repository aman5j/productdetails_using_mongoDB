
var express = require('express');
var router = express.Router();
var upload = require('./multer');
var fs = require("fs")
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var ProductType = require("./model/typesModel")
var Category = require("./model/categoryModel")
var Product = require("./model/productModel")
var Admin = require("./model/adminsModel")
var {ObjectId} = require('mongodb')

/* GET home page. */

router.get("/createschema", function (req, res) {
    var PT = new ProductType()
    var C = new Category()
    var P = new Product()
    var A = new Admin()
    
    res.send("Created")
})

router.get("/product_interface", function (req, res, next) {

    res.render("productinterface", { message: '' });
});

router.get("/fetch_product_type", function (req, res) {
    ProductType.find({}).then((result) => {
        res.json({ result: result })
    }).catch((e) => {
        res.json({ result: e })
    })
})

router.get("/fetch_product_category", function (req, res, next) {
    Category.find({ "producttypeid._id": req.query.typeid }).then((result) => {
        res.json({ result: result })
    }).catch((e) => {
        res.json({ result: e })
    })
})

router.post("/product_submit", upload.single('picture'), function (req, res, next) {
    try {
        console.log("DATA:", req.body)
        console.log("FILE:", req.file)
        var body = { ...req.body, productpicture: req.file.filename }
        console.log(body)
        var product = new Product(body)
        product.save().then((saveData) => {
            if (product == saveData) {
                res.render("productinterface", { message: 'Submitted Successfully' });
            }
            else {
                res.render("productinterface", { message: 'Database Error' });
            }
        })

    }
    catch (e) {
        console.log("Error:", e);
        res.render("productinterface", { message: 'Server Error' });
    }

});

router.get("/fetch_all_products", function (req, res, next) {
    try {
        Product.aggregate(
            [
                {
                    $lookup:{
                        from:"producttypes",
                        localField: "producttypeid",
                        foreignField: "_id",
                        as: "productTypeData"
                    },
                },
                {
                    $lookup:{
                        from: "productcategories",
                        localField: "productcategoryid",
                        foreignField: "_id",
                        as: "categoryData"
                    },
                },
            ],
            { $unwind : "$productTypeData"},
            { $unwind: "$categoryData"}
        ).then((result)=>{
            console.log("Result", result[0].productTypeData[0].producttypename)
            console.log("Result:",result)
            res.render("displayallproducts", {status:true,data:result})
        })
    }
    catch (e) {
        console.log("Error", e)
        res.render("displayallproducts", { result:[], message: "Error" })
    }
})

router.get("/displayforedit", function(req,res,next){
    try{
        Product.aggregate(
            [
                {
                    $lookup:{
                        from:"producttypes",
                        localField: "producttypeid",
                        foreignField: "_id",
                        as: "productTypeData"
                    },
                },
                {
                    $lookup:{
                        from: "productcategories",
                        localField: "productcategoryid",
                        foreignField: "_id",
                        as: "categoryData"
                    },
                },
                { $match: { _id: new ObjectId(req.query.productid)}},
            ],
            { $unwind : "$productTypeData"},
            { $unwind: "$categoryData"}
        ).then((result)=>{
            console.log("result",result)
            res.render("displayforedit", {data:result[0], message : "Success"})
        })
    }
    catch(e)
    {
        console.log("Error",e)
        res.render("displayforedit",{data:[],message:"Server Error"})
    }
});

router.post("/edit_product", function (req, res) {
    try {
        var {productid,btn,picture,...data}=req.body
      if(btn=="Edit")
      { Product.updateOne({"_id":productid},data).then((result)=>{
  
        res.redirect("/product/fetch_all_products")
      })
        
      }
      else
      {
        Product.deleteOne({"_id":productid}).then((result)=>{
  
          res.redirect("/product/fetch_all_products")
        })
          
  
      }
    } catch (e) {
      console.log("Error:", e);
      res.redirect("/product/fetch_all_products");
    }
  });

router.get("/displaypictureforedit", function(req,res){
    res.render("displaypictureforedit",{data:req.query})
})

// router.post("/edit_picture",upload.single("productpicture"), function(req,res,next){
//  console.log("ok")   
// });

  
/*

router.get("/document_details", function(req,res){
   try{
    var admin = localStorage.getItem('ADMIN')
    if(admin==null)
    {res.render("loginpage",{message:''})}
    else 
    {res.render("documentpage")}
   }
   catch(e)
   {
    res.render("loginpage",{message:''})
   }
    
})


*/

module.exports = router;

// pool.query("query",[parameters],function(error,result){
    // })

// select count(*) from products where productid in (select productid from producttype where productname='electronics')
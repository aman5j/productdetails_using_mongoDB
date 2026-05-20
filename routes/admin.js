// const express = require('express');
// const router = express.Router();

// const LocalStorage = require('node-localstorage').LocalStorage;
// localStorage = new LocalStorage('./scratch');

// // IMPORT MODELS
// const Admin = require('../routes/model/adminsModel');
// const Product = require('../routes/model/productmodel');
// const ProductType = require('../routes/model/producttypemodel');




// // ================= COUNT ELECTRONICS PRODUCTS =================

// router.get("/count_electrical_products", async function (req, res) {

//     try {

//         const productType = await ProductType.findOne({
//             producttypename: 'Electronics'
//         });

//         const count = await Product.countDocuments({
//             producttypeid: productType._id
//         });

//         res.status(200).json({
//             result: { e: count }
//         });

//     }
//     catch (e) {

//         console.log("Error:", e);

//         res.status(500).json([]);

//     }

// });


// // ================= COUNT SECURITY CAMERA PRODUCTS =================

// router.get("/count_securitycamera_products", async function (req, res) {

//     try {

//         const productType = await ProductType.findOne({
//             producttypename: 'Security Camera'
//         });

//         const count = await Product.countDocuments({
//             producttypeid: productType._id
//         });

//         res.status(200).json({
//             sc: count
//         });

//     }
//     catch (e) {

//         console.log("Error:", e);

//         res.status(500).json([]);

//     }

// });


// // ================= COUNT FURNITURE PRODUCTS =================

// router.get("/count_furniture_products", async function (req, res) {

//     try {

//         const productType = await ProductType.findOne({
//             producttypename: 'furniture'
//         });

//         const count = await Product.countDocuments({
//             producttypeid: productType._id
//         });

//         res.status(200).json({
//             f: count
//         });

//     }
//     catch (e) {

//         console.log("Error:", e);

//         res.status(500).json([]);

//     }

// });


// // ================= LOGOUT =================

// router.get("/logout", function (req, res) {

//     localStorage.clear();

//     res.render("loginpage", { message: '' });

// });


// module.exports = router;




var express = require('express');
var router = express.Router();
var pool = require('./pool');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var Admin = require('./model/adminsModel');
var ProductType = require("./model/typesModel")
var Category = require("./model/categoryModel")
var Product = require("./model/productModel")


router.get("/adminlogin", function(req,res){
    res.render("loginpage",{message:''})
});

// ================= CHECK ADMIN LOGIN =================

router.post("/check_admin_login", async function (req, res) {

    try {

        console.log("REQ Body:", req.body);

        const admin = await Admin.findOne({

            $or: [
                { emailid: req.body.emailid },
                { mobileno: req.body.emailid }
            ],

            password: req.body.password

        });

        if (admin) {

            localStorage.setItem('ADMIN', JSON.stringify(admin));

            res.render("dashboard", { data: admin });

        }
        else {

            res.render("loginpage", {
                message: 'Invalid UserId/Password'
            });

        }

    }
    catch (e) {

        console.log("Server Error:", e);

        res.render("loginpage", {
            message: 'Server Error'
        });

    }

});

// ================= COUNT ELECTRONICS PRODUCTS =================

router.get("/count_electrical_products", async function (req, res) {

    try {

        const productType = await ProductType.findOne({
            producttypename: 'Electronics'
        });

        const count = await Product.countDocuments({
            producttypeid: productType._id
        });

      
        res.status(200).json({
            result: { e: count }
        });
      
    }
    catch (e) {

        console.log("Error:", e);

        res.status(500).json([]);

    }

});

// ================= COUNT SECURITY CAMERA PRODUCTS =================

router.get("/count_securitycamera_products", async function (req, res) {

    try {

        const productType = await ProductType.findOne({
            producttypename: 'Security Camera'
        });

        const count = await Product.countDocuments({
            producttypeid: productType._id
        });

        res.status(200).json({
            // sc: count
            sc: {sc : count}
        });

    }
    catch (e) {

        console.log("Error:", e);

        res.status(500).json([]);

    }

});


// ================= COUNT FURNITURE PRODUCTS =================

router.get("/count_furniture_products", async function (req, res) {

    try {

        const productType = await ProductType.findOne({
            producttypename: 'Furniture'
        });

        const count = await Product.countDocuments({
            producttypeid: productType._id
        });

        res.status(200).json({
            // f: count
             f: {f : count}
        });

    }
    catch (e) {

        console.log("Error:", e);

        res.status(500).json([]);

    }

});



// router.post("/check_admin_login", function(req,res){
//     try{
//     Admin.find({"emailid": req.body.emailid, "password":req.body.password}).then((result)=>{
//         if(result.length==1)
//         {
//             res.render("dashboard",{data:result[0]})
//         }
//         else 
//         {
//             res.render("loginpage", { message : "Database Error"})
//         }
//     })
//     }
//     catch(e)
//     {
//         console.log("Error:",e)
//         res.render("loginpage",{message:'Server Error'})
//     }
// })


/*
router.post("/check_admin_login", function(req,res){
    try{
        console.log("Login Data:",req.body)
        pool.query("select * from admins where (emailid=? or mobileno=?) and password=?;",[req.body.emailid, req.body.emailid, req.body.password],function(error,result){
            if(error)
            {
                console.log("D Error:",error)
                res.render("loginpage",{message:'DataBase Error'})
            }
            else 
            {
                if(result.length==1)
                {   localStorage.setItem('ADMIN',JSON.stringify(result[0]))
                    res.render("dashboard",{data:result[0]})
                }
                else
                {   console.log("Data:",result)
                    res.render("loginpage",{message:'Invaid UserId/Password'})
                }
            }
        })
    }
    catch(e)
    {
        console.log("Error:",e)
        res.render("loginpage",{message:'Server Error'})
    }
})
*/

// router.get("/count_electrical_products", function(req,res){
//     try{
//         pool.query("select count(*) as e from products where producttypeid in (select producttypeid from producttype where producttypename='Electronics')", function(error,result){
//             if(error)
//             {
//                 console.log("D Error:",error)
//                 res.status(200).json([])
//             }
//             else
//             {
//                 res.status(200).json({result:result[0]})
//             }
//         })
//     }
//     catch(e)
//     {
//         console.log("Error:",e)
//         res.status(200).json([])
//     }
// })

// router.get("/count_securitycamera_products", function(req,res){
//     try{
//         pool.query("select count(*) as sc from products where producttypeid in (select producttypeid from producttype where producttypename='Security Camera')", function(error,result){
//             if(error)
//             {
//                 console.log("D Error:",error)
//                 res.status(200).json([])
//             }
//             else
//             {
//                 res.status(200).json({sc:result[0]})
//             }
//         })
//     }
//     catch(e)
//     {
//         console.log("Error:",e)
//         res.status(200).json([])
//     }
// })


// router.get("/count_furniture_products", function(req,res){
//     try{
//         pool.query("select count(*) as f from products where producttypeid in (select producttypeid from producttype where producttypename='furniture')", function(error,result){
//             if(error)
//             {
//                 console.log("D Error:",error)
//                 res.status(200).json([])
//             }
//             else
//             {
//                 res.status(200).json({f:result[0]})
//             }
//         })
//     }
//     catch(e)
//     {
//         console.log("Error:",e)
//         res.status(200).json([])
//     }
// })

router.get("/logout", function(req,res){
    localStorage.clear()
    res.render("loginpage",{message:''})
});




module.exports = router;
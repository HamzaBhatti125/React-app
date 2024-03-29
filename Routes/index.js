const express = require("express")
const router = express.Router()
// const gravatar = require("gravatar")
// const bcrypt = require("bcryptjs")
// load User Model
const User = require("../models/Users")
const confirmBuying = require("../models/confirmBuying")

router.use("/test",(req,res) => 
    res.json({
    msg : "user works"
})) 
router.use("/fetchData",(req,res)=> {
    res.json({
        fortest : "dumy data"
    })
})
router.use("/insert",(req,res)=>{
    let a = 7
    console.log("server",req.body)
    res.send(a)
})
// register user
// console.log("index.js")
router.use("/checkingUser",(req,res) => {
 res.json({email : email})
})
var email = null

// a =  () => {
//     email = true
// }
// a()
router.post("/register",(req,res)=>{
 
    // console.log("req.body.email",req.body.email)
    User.findOne({email : req.body.email })
        .then(user => {
            if(user){
                // email = false
                res.send(false)
                console.log("signup failed user exists...")
            }else{
                // email = true
                res.send(true)

                let newUser = new User({
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : req.body.password    
                })
                // console.log("signup success",newUser)

                newUser.save()
                    .then(user => console.log("successfully signup data"))
                    .catch(err => console.log(err))

                
            }
            // console.log("email",email)
        })
})

router.post("/login",(req,res) => {
    email  = req.body.email
    password = req.body.password

    User.findOne({email : email})
        .then( user => {
            if(!user){
                console.log("email address not found")
                res.send(false)
                // return res.status(404).json({email : "user not found"})
            }
            if(password == user.password){
                res.send(true)
                console.log("successful Signin")
                // res.status(400).json({msg: "Successfully Login" })
            }
            else{
                res.send(false)
                console.log("password not found")
                return res.status(404).json({password : "password incorrect"})

            }
        })
})

// COnfirm Buying

router.use("/confirmBuying",(req,res) => {

    console.log("req.body.name",req.body,req.body.length)



    let newItem = new confirmBuying ({
        BuyingList : req.body.buyingList ,
        TotalPrice : req.body.totalPrice
    })
    console.log("newItem",newItem)
    newItem.save()
    .then(res => console.log("successfully inserted"))
    .catch(err => console.log("error in insertion",err))
})

module.exports = router
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")


const index = require("./Routes/index")

const app = express()


//BodyParser
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

// config
// const  db = require("./config/keys").mongoURI

mongoose.connect("mongodb://localhost/E-dealers",{ useNewUrlParser: true })
.then( () => console.log("successfully connected to mongoDB") )
.catch( (err) => console.log("err",err) )



app.get("/", (req,res) => res.send("hello"));

app.use("/",index)

// app.post("/testtt",(req,res) => {
//     res.json({
//         server : "data from server"
//     })
//     console.log("res",res)
// })

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server running on port ${port}`))
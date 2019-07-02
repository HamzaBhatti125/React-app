const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({

    BuyingList : {
        type : Object,
        required : true
    },
    TotalPrice : {
        type : Number,
        required : true  
    },
    Date : {
        type : Date,
        default : Date.now 
    }
    
})

module.exports = boughtItems = mongoose.model("boughtItems",UserSchema)
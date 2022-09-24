

const { Schema, model } = require("mongoose")



const UserSchema = new Schema({

    name:{
        type: String,        
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


module.exports = model("Users" , UserSchema)

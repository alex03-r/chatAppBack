

const { Schema , model } = require("mongoose")



const MessagesShema = new Schema({

    
    content:{
        type: String
    },
    from:{
        type:Object
    },
    date:{
        type: String
    },
    time:{
        type:String
    },
    to:{
        type:String
    }

})


module.exports = model("Messages", MessagesShema)

const mongoose = require("mongoose")




async function ConectDb() {

  try {

   await  mongoose.connect(process.env.dbConnection);

   console.log("db conected")
    
  } catch (error) {

    console.log("hello")
    
  }

}


module.exports = ConectDb
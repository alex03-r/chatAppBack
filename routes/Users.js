
const express = require("express")
const router = require("express").Router()
const cors = require("cors")
const app = express();
const userModel = require("../models/users")
 



router.use(cors({
    origin:"*",
    credentials: true
  
}))

router.use(express.json())


router.get('/users' , async (req, res) => {

    let users = await userModel.find();
        
    return res.json({
        ok:true,
        users:users
    })
    

})


router.post('/login' , async (req, res) => {

    let { email , password} = req.body;

    let user  =  await userModel.findOne({email })

    if( user &&  user.password ==  password ){
     
      return res.json({
            ok:true,
            msg:" you are log in yes",
            user:user
        })

    }


    return res.json({
        ok:false,
        msg:"Sorry this user does not exits"
    })   
    

})


router.post('/signup' , async (req, res) => {

    let body = req.body;
    let { email } = body;
    let exitsEmail = await  userModel.findOne({ email })

    if(exitsEmail) {

        return res.json({
            ok:false,
            msg:"This email is already in use, please use other email"
        })

    }
        
    let hasProps = Object.keys(body)

    if(hasProps.length == 3){

       await userModel(body).save()

       return res.json({
            ok:true,
            msg:"wellcome , you can log in"
        })

    }


    return res.json({
        ok:false,
        msg:"sorry there is a missing field please check out "
    })
            
})




module.exports = router;
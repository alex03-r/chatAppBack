
const express = require("express")
const router = require("express").Router()
const cors = require("cors")
const app = express();
const userModel = require("../models/users")
 
const bcrypt = require("bcrypt")

const  generateToken  = require("../helper")

router.use(cors({
    origin:"*",
    credentials: true
  
}))

router.use(express.json())

router.post('/login' , async (req, res) => {

    let { email , password} = req.body;

    let user  =  await userModel.findOne({email })

    if( !user  ){

            return res.status(400).json({
                ok:false,
                msg:"Sorry this user does not exits"
            })     
    }


    const validPassword = bcrypt.compareSync(password, user.password )

    if(!validPassword) {

       return res.status(400).json({
            ok:false,
            msg:"The password is incorrect"

        })
    }


//    let token = await  generateToken(user._id , user.name );

      
    return res.status(200).json({
        ok:true,
        msg:" you are log in yes",
        user:user,
        // token    
    })
    

})


router.post('/signup' , async (req, res) => {

    let body = req.body;
    let { email, password } = body;
    let exitsEmail = await  userModel.findOne({ email })

    if(exitsEmail) {

        return res.json({
            ok:false,
            msg:"This email is already in use, please use other email"
        })

    }
        
    let hasProps = Object.keys(body)
    


    if(hasProps.length == 3){

        let user = new userModel(body)
        const salt =  bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(password, salt )

        user.save()

    //    await userModel(body).save()

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
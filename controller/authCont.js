const authModel = require('../models/authSchema')
const bcrypt = require('bcryptjs')


const signUp= async(req,res)=>{
 

    let checkUser= await authModel.findOne({email:req.body.email})
   if(checkUser){
       res.send({
           Response:checkUser,
           Messgae:"Email Already in use"
       })
   }
   else{
        let hashPass= await bcrypt.hash(req.body.password,12)
        let userCreate = new authModel({
            email:req.body.email,
            password:hashPass
        })
        userCreate.save().then(()=>{
            res.send("User Created Successfully!")
        }).catch(()=>{
            res.send("Some Thing Went Wrong!")
        })
   }

}



const signIn= async(req,res)=>{
    let checkUser= await authModel.findOne({email:req.body.email})
    if(checkUser){

     

        let checkPass= await bcrypt.compare(req.body.password,checkUser.password)
        if(checkPass){
            res.send("Logged in Successfully!")
        }
        else{
            res.send("Incorrect Password!")
        }
        
        
    }
    else{
        res.send("No Such Email Exist ")
    }

}

module.exports={
    signUp,
    signIn
}

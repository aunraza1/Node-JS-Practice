
// Introduction to Express First Class

// const express=require('express')
// const app=express()

// app.get('/',(req,res)=>{
//     res.send("Hello-World Welcome to Node JS")

// })

// app.listen(3000,()=>console.log("Listening on Port 3000"))



// Setting a port for the application

const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app =express()
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
let authModel=require('./authSchema')



mongoose.connect('mongodb+srv://Aun:hblmcbbank@cluster0.urv5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err)=>{
    if(err){
        console.log("Database Not Connected!",err)
    }
    else{
        console.log("Connected TO MongoDb")
    }
})



app.use(cors())

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('Welcome to Node JS')

})


app.post('/signup', async(req,res)=>{
 

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


//    let userCreate= new authModel({
//        email:req.body.email,
//        password:req.body.password 
//    })
//    userCreate.save().then((responce)=>{
   
//        res.status(200).send({message:"Data Added Successfully",responce:responce})
     
//    })
//    .catch((err)=>{
//        console.log("Error=>"+err)

//    })

})

let port = process.env.PORT||4000

 app.listen(port,()=>console.log("Listening on Port " +port))

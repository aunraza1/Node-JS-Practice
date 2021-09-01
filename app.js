
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
const mainRouter = require('./Routes/mainRoute')



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
app.use(mainRouter)


app.get('/',(req,res)=>{
    res.send('Welcome to Node JS')

})










let port = process.env.PORT||4000

 app.listen(port,()=>console.log("Listening on Port " +port))

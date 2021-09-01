const todoModel = require('../models/todoSchema')

const addToDo=async(req,res)=>{
    let checkTodo= await todoModel.findOne({todos:req.body.todos})
    if(checkTodo){
        res.send("Todo Already exist")
    }
    else{
      let todos= new todoModel({
          todos:req.body.todos
      })
      
        todos.save().then(()=>{
            res.send({message:"Todo Added Successfully",result:todos})
        }).catch(()=>{
            res.send({message:"Something Went Wrong!"})
        })
    }
  


}


const getTodo=async(req,res)=>{

let result = await todoModel.find()

res.send({message:"Todos Fetched Successfully", todos:result})

  
}

module.exports={
    addToDo,
    getTodo,
}
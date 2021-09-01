const mongoose= require('mongoose')


const todoSchema=mongoose.Schema({
    todos:{type:String}
})
const todoModel=mongoose.model('todoData',todoSchema)

module.exports=todoModel
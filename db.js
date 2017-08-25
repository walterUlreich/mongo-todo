var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/todo-app')

var todoSchema = mongoose.Schema({
    text : {
        type: String,
        required: true,
    },
    done : {
        type: Boolean,
        default: false,

    },

})

var TodoModel = mongoose.model('todo', todoSchema, 'todo')

module.exports = TodoModel

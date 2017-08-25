var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('./public'))
app.use(bodyParser.json())

var TodoModel = require('./db')



// These routes send HTML to clients //
app.get('/', function(req, res){
    res.sendFile('index.html', {root: './public'})
})
///////////////////////////////////



// These routes can be considered to be part of the API of our application //
// commonly, when people talk about your application's API,
// they're talking about the routes you have set up that let you interact with the database,
// usually by sending/receiving JSON data.

// (R)ead todo items
app.get('/todo', function(req, res, next){
    TodoModel.find({}, function(err, data){
        if (err) { next(err) }
        else {
            res.send(data)
        }
    })
})

// (C)reate todo items
app.post('/todo', function(req, res){
    var newTodo = new TodoModel({
        text: req.body.todoText
    })
    newTodo.save(function(err){
        if (err) { next(err) }
        else {
            res.send({success:'success!'})
        }
    })
})

// mark todos as complete/incomplete - (U)pdate
app.post('/todo/done', function(req, res){
    console.log('its done!')

    // mongoose
    TodoModel.findOne({_id: req.body._id}, function(err, doc){
        console.log(doc)
        if (err) { next(err) }
        else {
            doc.done = !doc.done
            doc.save(function(err){
                if(err){next(err)}
                else{
                    res.send({success:'success!'})
                }
            })
        }
    })
})


// (D)elete todos  //
app.delete('/todo/:_id', function(req, res, next){

    TodoModel.remove({_id: req.params._id}, function(err){
        if (err) { next(err) }
        else {
            res.send({success:'success!'})
        }
    })
})

/////////////////////////////////////////////////////////////////////////



app.use(function(req, res, next){
    res.status(404).send("not found")
})

// if we call `next(err)` in our code above, it'll jump us down to right here.
app.use(function(err, req, res, next){
    res.status(500).send("oops")
})
app.listen(8080)

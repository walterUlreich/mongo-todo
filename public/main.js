var getFreshData = function(){
    $.get('/todo', function(dataFromServer){
        console.log(dataFromServer)
        mainVm.todos = dataFromServer
    })
}

var mainVm = new Vue({
    el: '#app',
    data : {
        todoText : '',
        todos    : [],
    },
    methods : {
        createTodo : function(event){
            event.preventDefault()
            // inside of a vue method, we can use `this` to access any data or method on that VM.
            // always send an object when using AJAX
            console.log(this.todoText)

            $.ajax({
                url: '/todo',
                type: 'POST',
                data: JSON.stringify({todoText: this.todoText}),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        // only clear the form after we know the submission was successful
                        mainVm.todoText = ''
                        getFreshData()
                    }
                }
            });
        },
        markDone: function(todo){
            console.log(todo)

            $.ajax({
                url: '/todo/done',
                type: 'POST',
                data: JSON.stringify(todo),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        // only clear the form after we know the submission was successful
                        getFreshData()
                    }
                }
            });
        },
        deleteTodo: function(todo, event){
            // $.delete() // this function does not exist in jQuery
            event.stopPropagation()
            $.ajax({
                url: `/todo/${todo._id}`,
                type: 'DELETE',

                // we can't attach a body to a DELETE request.
                // we'll need to add the data to the URL somehow
                // data: JSON.stringify(todo),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(dataFromServer) {
                    console.log(dataFromServer)
                    if ( dataFromServer.success ) {
                        // only clear the form after we know the submission was successful
                        getFreshData()
                    }
                }
            });
        }
    },

    created : function(){
        getFreshData()
    }
})

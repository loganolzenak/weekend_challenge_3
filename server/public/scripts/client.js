console.log('js')
$( document ).ready( function(){
   
   
    getTask();


    $('#addTask' ).on( 'click', function(){
        console.log('click button :)');

    var addNewTask = {
        task: $('#task').val(),
        date: $('#date').val(),
        goal_date: $('goal_date').val(),
        completed: $('#completed').val()
    }


    // })
    // function getTask(addNewTask){
    //     $.ajax({
    //         url: 'tasks',
    //         type: 'POST',
    //         data: addNewTask,
    //         success: function(data){
    //             console.log('Got Task', data);
    //         },
    //         error: function(error){
    //             console.log('failure on post');
    //         }

            }
        
    

        )}

    })

console.log('js')
$( document ).ready(onReady);

function onReady(){
    getTasks();



    $('#addTask').on('click', function(){
        addNewTask();
        clearInputs();
        
    })
    $('#gettingTasks').on('click', '.deleteButton', function(){
        
        
        const taskId =$(this).data('id');
        deleteTask(taskId);
    })


    function addNewTask(){
    
    let newTask = {
        task: $('#task').val(),
        date: $('#date').val(),
        goal_date: $('#goal_date').val(),
        completed: $('#completed').val()
      }
      $.ajax({
          type: 'POST',
          url: '/tasks',
          data: newTask
      }).done(function(response){
          console.log('add task');
          getTasks();
      }).fail(function(response){
          console.log('fail in post');
      })
   
    } // end newTask function

    function getTasks(){

    $.ajax({
        type:'GET',
        url:'/tasks'    
    }).done(function(response){
        console.log('success in get');
        displayTasks(response);
    }).fail(function(response){
        console.log('fail on get');
    })//end get task function 

}// end getTasks



        function displayTasks(tasks){
            let $tableBody = $('#gettingTasks');
            $tableBody.empty();
            for(let row=0; row<tasks.length; row++){
                let keys = Object.keys(tasks[row]);

                let $tr = $('<tr>');
                for (let col=0; col<keys.length +2; col++){
                    if(col === keys.length){
                        $tr.append($('<td>').addClass(keys[col]).append($('<button>').data('id',tasks[row].id).text('Delete').addClass('deleteButton')));
                    } else if (col === keys.length +1){
                        $tr.append($('<td>').addClass(keys[col]).append($('<button>').data('id', tasks[row].id).text('complete').addClass('completedButton')));
                    } else{
                        $tr.append($('<td>').addClass(keys[col]).text(tasks[row][keys[col]])[0]);
                    }
             }
            $tableBody.append($tr);
          }


        }

 function deleteTask(id){
    $.ajax({
    type: 'DELETE',
    url: `/tasks/${id}`,
})
.done((response)=>{
    console.log('task deleted');
    getTasks();
})
.fail((error)=>{
 console.log('error in delete task');
                    
  })
 }












// function getOnDom(tasks){
//     console.log(tasks);
    
//     for(let i=0; i<tasks.length; i++){
//         $('#gettingTasks').append(tasks[i].task + '' + ':');
//         $('#gettingTasks').append(tasks[i].date + '');
//         $('#gettingTasks').append(tasks[i].goal_date + '');
//         $('#gettingTasks').append(tasks[i].completed + '' + '<br>');
        
//     }// end for loop tasks
// } // end get on dom



    function clearInputs(){
        $('#task').val('');
        $('#date').val('');
        $('#goal_date').val('');
        $('#completed').val('');
        $('#gettingTasks').empty();
    }// end of clearInputs function








     


} 
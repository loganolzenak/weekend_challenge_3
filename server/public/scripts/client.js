console.log('js')
$( document ).ready(onReady);

function onReady(){
    $('#addTask').on('click', function(){
        addNewTask();
        clearInputs();
    })

getTasks();

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
        getOnDom(response);
    }).fail(function(response){
        console.log('fail on get');
    })//end get task function 

}// end getTasks

function getOnDom(tasks){
    console.log(tasks);
    
    for(let i=0; i<tasks.length; i++){
        $('#gettingTasks').append(tasks[i].task + '' + ':');
        $('#gettingTasks').append(tasks[i].date + '');
        $('#gettingTasks').append(tasks[i].goal_date + '');
        $('#gettingTasks').append(tasks[i].completed + '' + '<br>');
        
    }// end for loop tasks
} // end get on dom



    function clearInputs(){
        $('#task').val('');
        $('#date').val('');
        $('#goal_date').val('');
        $('#completed').val('');
        $('#gettingTasks').empty();
    }// end of clearInputs function








     


} 
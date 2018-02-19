const express = require('express');
const app = express();
const path = require('path');
const pool = require('./modules/pool');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

let tasks = [];


app.post('/tasks', (request, response)=>{
  const task = request.body;
  tasks.push(task);
  console.log('adding task', task);
  
  const sqlText = `INSERT INTO tasks (task, date, goal_date, completed) VALUES ($1,$2,$3,$4)`;
  pool.query(sqlText,
  [task.task, task.date, task.goal_date, task.completed])
  .then((result)=>{
    console.log('added task', result);
    response.sendStatus(201);
  })
  .catch((error)=>{
    response.sendStaus(500);
  })
})// post tasks done

app.get('/tasks', (request, response)=>{
  const sqlText = `SELECT * FROM tasks`;
  pool.query(sqlText)
  .then(function(result){
    console.log('working in get');
    
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error in get');
    response.sendStatus(500);
  })
})

app.delete('/tasks/:id', (request, response)=>{
  const sqlText = `DELETE FROM tasks WHERE id=$1`;
  const id = request.params.id;
  pool.query(sqlText, [id]).then((result)=>{
    console.log('deleted task', id);
    response.sendStatus(200);
  })// end success
  .catch((error)=>{
    console.log('error in server delete');
    response.sendStatus(500);
  })
})

app.listen(port, function(){
  console.log('listening on port', port);
});
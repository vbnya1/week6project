let express = require('express');

let router = express.Router();

let utils = require('./utils');

var db = require('./db');

var taskCollections = '';

router.get('/',(req,res)=>{
    res.redirect('/getAll');
    //res.render('index.html');
});

router.get('/addnew',(req,res)=>{
    res.render('newtask.html');
});

router.get('/getAll',(req,res)=>{
    taskCollections = db.get().collection('tasks');

    taskCollections.find().toArray(function(err,result){
        if(err) {
            console.log('Error Occured');
        }else {
           // console.log(result);
            res.render('getall.html',{taskDb : result});
        }
    })
});

router.post('/addnew',(req,res)=>{
    taskCollections = db.get().collection('tasks');
    let taskDetails = req.body;
    let date = new Date(req.body.duedate);
    
    taskDetails['duedate'] = date;
    utils.save(taskDetails);
    //console.log(taskDetails);
    res.redirect('/getAll');
});

router.get('/getTask/:taskId',(req,res)=>{
    taskCollections = db.get().collection('tasks');

    let taskId = req.params.taskId;
    let query = {_id : parseInt(taskId)};

    console.log(query);
    taskCollections.find(query).toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        var dt = new Date(result[0].duedate);
        
        res.render('gettask.html',{task:result[0]});
    });
   
});

router.post('/updateTask',(req,res)=>{
    let taskDetails = req.body;
    console.log(taskDetails);
    //let taskDetails = req.body;
    let date = new Date(req.body.duedate);

    taskDetails['duedate'] = date;
    updateTask(taskDetails);
    res.redirect('/getAll');
});

router.get('/deleteTask/:taskId',(req,res)=>{
    let taskId = req.params.taskId;
    deleteTask(taskId);
    res.redirect('/getAll');
});

router.get('/removeCompleted',(req,res)=>{
    deleteCompleted();
    res.redirect('/getAll');
});

function deleteCompleted(){
    let query = { status : 'Completed'};
    taskCollections.deleteMany(query);
}

function updateTask(taskDetails){
    let filter = {_id : parseInt(taskDetails._id)};
    let query = taskDetails;

    delete query._id ;

    //console.log(query);
    console.log('Id ' + query._id);
    let updateQuery = {$set : query};
    console.log(updateQuery);
    taskCollections.updateOne(filter,updateQuery,{upsert : false});
    console.log(query);
}

function deleteTask(taskId){

    let query = {_id : parseInt(taskId)};
    console.log('Delete '+ query._id);
    taskCollections.deleteOne(query,function(err,obj){
        console.log(obj.result);
    })
}

module.exports = router;
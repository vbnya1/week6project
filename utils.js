
var db = require('./db');


exports.save = function(taskDetails){
    var taskCollections = db.get().collection('tasks');

    var id = Math.floor(1000 + Math.random() * 9000);
    let query = {_id : id};
    taskCollections.find(query).toArray(function(err,result){
        if(err){
            console.log('Error In Id');
        }else {
            if(result.length === 0 || result == null){
                console.log(id);
                taskDetails['_id'] = id;
                postData(taskDetails);
                //return id;
            }else {
                console.log('Id Found Creating Another One');
                console.log(result);
                return getNewId();
            }
        }
    });
}

function postData(taskDetails){
    var taskCollections = db.get().collection('tasks');
    taskCollections.insertOne(taskDetails);
}



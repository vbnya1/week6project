var MongoClient = require('mongodb').MongoClient;

//var MongoClient = monogodb.MongoClient;

var state = {
    db : null,
};

exports.connect = function(url,done){
    if(state.db) return done()

    MongoClient.connect(url,{useNewUrlParser: true} ,function(err,client){
        if(err) return done(err)
        state.db = client.db('taskDb');
        done()
    })
}

exports.get = function() {
    console.log('Get');
    return state.db
}

exports.close = function(done) {
    if(state.db){
        state.db.close(function(err,result){
            state.db = null
            state.mode = null
            done(err)
        })
    }
}


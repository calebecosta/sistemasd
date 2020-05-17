var Datastore = require('nedb')
  , db = new Datastore({ filename: 'msg.db', autoload: true });

exports.gravar_mensagem = function(doc){
    db.insert(doc, function (err, newDoc) {
    }); 
}

exports.listar = function(callback){
    db.find({})
    .sort({ timestamp:1 }) 
    .limit()
    .exec (function (err, docs){
        callback(docs);
      })
}


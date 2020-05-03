const axios = require('axios').default;
const request = require('request');
let Usuario = require('../models/dados');

exports.logar = function(dados,callback){
    request({
        url: "https://api.milvus.com.br/api/login/",
        method: "POST",
        json: dados,
        headers: {
            "content-type": "application/json"
        }
    }, function (err, body) {
        if (body.statusCode == 200 && body.body.token) {
           callback(   
            {
             username:dados.username,
             success:'login feito',
             status:body.statusCode,
             token:body.body.token
            }
        );
             
        }else{  
          callback({"error": body.body,status:body.statusCode});
        }
    });
};

    exports.list = function(callback){  
        Usuario.find({},function(error,dados){
            if(error){
                callback({error: 'nao foi possivel encontrar nehum dado'})
            }else{
                callback(dados)
            }
        })
    }

    exports.achar = function(user,callback){  
        Usuario.find(user,function(error,dados){
            if(JSON.stringify(dados)=="[]"){
                callback({error: 'nao existem usuarios'})
            }else{
                callback({success: dados});
            }
        })
    }
    let Usuario = require('./models/dados');

exports.criar= function(dados,callback){
    new Usuario({
        'username': dados.username,
        'token': dados.token,
        'chatid':dados.chatid
    }).save(function (error,dados) {
        if (!error) {  
       callback({message:"gravado"}) ;
        } else {
       callback({message:"error"});
        }
    })

}




var AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId: 'AKIAIPNUVY75HCS4MWJQ',
    secretAccessKey: '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',
    region: 'sa-east-1'
});


const uuid = require('uuid');

var Usuario = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "Usuario",
    ProjectionExpression: "#id,devedor, empresa,valor_divida,dt_divida",
    ExpressionAttributeNames: {
        "#id": "id",
    }
}

var paramsD = {
    TableName: "Usuario",
    Key:{
       "id":"id"
    },
    ConditionExpression:"id <= :val",
    ExpressionAttributeValues: {
        ":val": "40dbba90-add6-11ea-98fc-abee9a69cd37"
    }
};

exports.listar = function (callback) {
    Usuario.scan(params,function (err, data) {
        if (err) {
            callback(err)
        } else {
            callback(data.Items)
        }
    })
}

exports.gravar = function(params,callback){
params.id = uuid.v1();
    var usuario = {
        TableName: "Usuario",
        Item:params
    }
    Usuario.put(usuario,function(err,data){
        if(!err){
         callback(data);
        }else{
        callback(err);
        }
      })
}

exports.excluir = function(params,callback){
    paramsD.Key.id = params.id;
    paramsD.ExpressionAttributeValues = { ":val": params.id};
        Usuario.delete(paramsD,function(err,data){
            if(!err){
             callback(data);
            }else{
            callback({error:"item nao existe"});
            }
          })
    }

var mongoose = require('mongoose');
var urlString='';

//metodo de conexao com o banco
mongoose.connect(urlString,{ useUnifiedTopology:true, useNewUrlParser: true },function(err,res){
    if (err){
        console.log("banco nao conectado");
    }else{
      console.log("banco conectado");
    }
});



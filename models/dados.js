var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UsuarioSchema= new Schema({
        usuarioId: String,
       msg: String,
      _id : {select : false},
    //  __v : {select : false},
});
module.exports = mongoose.model('pagina', UsuarioSchema);
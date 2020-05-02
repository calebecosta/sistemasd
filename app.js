let express = require("express");
let cors = require("cors");
let app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cifrar = require('ciphervgnr');

app.use(cors());
app.use(express.static('public'));

let key = 'pesadomano';

// cifra DE Vigenère UTILIZADA. Pacote :https://www.npmjs.com/package/ciphervgnr

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('chat message', function (mensagem) {
    var cifrada = cifrar(mensagem, key);
    var descriptografada = cifrar(cifrada, key, true);
    //descomentar abaixo para testar o erro (padrao é dar certo)
   mensagem='a';
    
    io.emit('message', "O servidor recebeu " + cifrada + " e a descriptografou. Resultado : " + descriptografada + ". O servidor enviou " + descriptografada + " para o cliente");
    
    if (mensagem ==descriptografada) {
      console.log("mensagem :"+mensagem)
      console.log("des: "+descriptografada)
      io.emit('success', " Cliente  recebeu a mesma mensagem que é : " + descriptografada);
    } else {
      io.emit('error', "Cliente nao recebeu a mesma mensagem. Recebeu: " + mensagem);
    }

  });
});

http.listen(port, function () {
  console.log("Acesse em: "+"http://localhost:"+ port);
});




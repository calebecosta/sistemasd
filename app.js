let express = require("express");
let cors = require("cors");
let app = express();
const bodyParser = require('body-parser')
app.use(cors());
app.use(express.static('public'));

global.armazenamento;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

var port = process.env.PORT || 3000;

app.listen(port,"0.0.0.0",function(){
  
  console.log("rodando")
})

app.get('/cliente', function (req, res) {

  res.sendFile(__dirname + '/usuario.html');
});


app.post('/cliente/mensagens/enviar/', function(req,res){
  res.status(200);
  res.json({ "ok": "ok" })
  if(!global.armazenamento){
    global.armazenamento = req.body;
  }

  console.log(global.armazenamento)
})

app.get('/cliente/mensagens/checar/:', function(res,req){
  if(global.armazenamento.lenght){
    res.json(global.armazenamento.msg);
  }
  console.log("Usuario que veio:" + res.body.usuario);
})


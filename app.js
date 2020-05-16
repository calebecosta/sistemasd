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
    global.armazenamento = req.body;
  //console.log(global.armazenamento)
})

app.get('/cliente/mensagens/checar/', function(req,res){
  if(global.armazenamento){
   res.json(JSON.stringify(global.armazenamento));
  }
  res.status(200);


  console.log(global.armazenamento)

 // console.log("Usuario que veio:" + res.body.usuario);
})


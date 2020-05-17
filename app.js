let express = require("express");
let cors = require("cors");
let app = express();
const bodyParser = require('body-parser')
app.use(cors());
app.use(express.static('public'));
const api = require('./controller/apicontroller')


app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

var port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", function () {
  console.log(`Chat Rodando na porta ${port}`)
  console.log(`Acesse http://localhost:${port}/chat`)
})

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

app.post('/cliente/mensagens/enviar/', function (req, res) {
  api.gravar_mensagem(req.body)
  res.status(200);
  res.json({ "message": "gravada" })
})

app.get('/cliente/mensagens/checar/', function (req, res) {
  api.listar(function (callback) {
    res.send(callback);
  })
  res.status(200);
})


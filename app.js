let express = require("express");
let cors = require("cors");
let app = express();
var messages = require('./helloworld_pb');
var services = require('./helloworld_grpc_pb');
var grpc = require('grpc');


app.use(cors());
app.use(express.static('public'));

app.set('view engine', 'ejs');

let aviso = ['\x1b[33m'];
let error = ['\x1b[31m'];
let log = ['\x1b[2m'];

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Servidor Web Rodando! Para startar o servidor RPC entre em " + aviso[0] + "http://localhost:3000/servidor");
})

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/servidor', function (req, res) {
  res.json({ ok: "ok" });

  function sayHello(call, callback) {
    var reply = new messages.HelloReply();

    reply.setMessage('Olá ' + call.request.getName());
    callback(null, reply);
  }

  function rpc() {
    var server = new grpc.Server();
    server.addService(services.GreeterService, { sayHello: sayHello });
    console.log("Servidor acessado!");
    server.bind('localhost:50001', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("Rodando na Porta TCP 50001");
    console.log("Acesse" + aviso[0] + " http://localhost:3000/cliente para utilizar o rpc");

  }
  rpc();

})

app.get('/cliente', function (req, res) {
  res.render('cliente');
})


app.post('/rpc', function (req, res) {

  if (req.body.method == "rpc") {
    function main() {
      var client = new services.GreeterClient('localhost:50001',
        grpc.credentials.createInsecure());
      var request = new messages.HelloRequest();
      var user;
      if (process.argv.length >= 3) {
        user = process.argv[2];
      } else {
        user = '' + req.body.nome;
      }

      request.setName(user);
      client.sayHello(request, function (err, response) {
        if (response == undefined) {
          console.log(error[0], "Servidor não está rodando! reinicie a aplicação")
          res.status(403).end()
        } else {
          console.log('Nome recebido:', response.getMessage()); 
          res.status(201).end()
        }
      });
    }
    main();
  }
  res.status(200).end()
})




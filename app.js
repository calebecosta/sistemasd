let express = require("express");
let app = express();
let cors = require("cors");

app.use(cors());

var port = process.env.PORT || 3000;
app.listen(port,"0.0.0.0",function(){
    console.log("Servidor Web Rodando")

})

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/',function(req,res){
res.json({ok:"rondando"});
})

var messages = require('./helloworld_pb');
var services = require('./helloworld_grpc_pb');

var grpc = require('grpc');


function sayHello(call, callback) {
  var reply = new messages.HelloReply();
  reply.setMessage('Hello ' + call.request.getName());
  callback(null, reply);
}

function main() {
  var server = new grpc.Server();
  server.addService(services.GreeterService, {sayHello: sayHello});
  console.log("Serviço RPC implantado");
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Server RPC escutando na porta 50051");
}

main();

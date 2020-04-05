let express = require("express");
let app = express();
let cors = require("cors");
const axios = require('axios').default;

app.use(cors());

var port = process.env.PORT || 3000;
app.listen(port,"0.0.0.0",function(){
    console.log("Servidor RPC rodando!")

})

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/',function(req,res){
res.json({ok:"ok"});
})




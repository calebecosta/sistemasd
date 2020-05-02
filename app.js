let express = require("express");
let cors = require("cors");
let app = express();

app.use(cors());
app.use(express.static('public'));

app.listen(PORT,function(){
  console.log("rodando")

})

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});






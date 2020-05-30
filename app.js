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
  console.log(`Acesse http://localhost:${port}/chat`)
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/consultar', function (req, res) {

})

app.get('/gravar', function (req, res) {
 
  res.status(200);
})


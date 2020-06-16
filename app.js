const api = require('./controller/apicontroller')
const fastify = require('fastify');
const app = fastify();
const path = require('path')
app.use(require('cors')())

app.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})


app.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

var port = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen(port)
    console.log(`Acesse http://localhost:${port}/cadastroDevedor`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()

app.get('/listarDevedores', function (request, reply) {
  api.listar(function (callback) {
    reply.send(callback);
  })
});


app.post('/cadastro/novaDivida', function (request, reply) {
  console.log(request.body);
  api.gravar(request.body, function (callback) {
    if (callback) {
      reply.send({ "success": "devedor cadastrado" });
    } else {
      reply.send({ "error": "devedor nao cadastrado" });
    }
  })
})

app.post('/cadastro/alterarDevedor', function (request, reply) {
  console.log(request.body);
  api.alterar(request.body, function (callback) {
    if (callback) {
      reply.send(callback);
    } else {
      reply.send({ "error": "devedor nao alterado pois nao existe / foi excluido" });
    }
  })
})


app.post('/cadastro/excluirDevedor', function (request, reply) {
  console.log(request.body);
  api.excluir(request.body, function (callback) {
    if (!callback.error) {
      reply.send({ "success": "devedor excluido" });
    } else {
      reply.send({ "error": "devedor nao existe / já excluido" });
    }
  })
})

app.get('/devedores', function (request, reply) {
  reply.view('./views/devedores.ejs')
})

app.get('/cadastroDevedor', function (request, reply) {
  reply.view('./views/cadastro.ejs')
})
document.getElementById("carregar").addEventListener('click', function (event) {
    document.getElementById("dados").innerHTML = ""
    listarDevedor();
})


function excluirDevedor(id) {
    axios.post('http://127.0.0.1:3000/cadastro/excluirDevedor', {
        id: id
    }).then(function (response) {
        if (response.status == "200") {
            document.getElementById(id).innerHTML = ""
        }
    }).catch(function (error) {
        window.alert(error)
    })
}



function listarDevedor() {

    axios.get('http://127.0.0.1:3000/listarDevedores', {

    }).then(function (response) {
        console.log(response.data)
        if (response.status == "200" && response.data.length !== 0) {
            let div = ``;
            let i;
            console.log(response.data.length)
            for (i = 0; i <= response.data.length; i++) {
                document.querySelector("#dados").innerHTML += `
      <div id="${response.data[i].id}" class="row">
       <div class="col">
        <div class="jumbotron">
        <div class="container">
          <p class="lead">
          </p>
          <blockquote class="blockquote">
          <h4>Dados do Devedor</h4>
            <p class="mb-0">Nome: ${response.data[i].devedor.devedor}</p>
            <p class="mb-0">Nome da empresa: ${response.data[i].devedor.empresa}</p>
            <p class="mb-0">Valor da Divida: ${response.data[i].devedor.valor_divida}</p>
            <p class="mb-0">Data que foi feita a divida: ${response.data[i].devedor.dt_divida}</p>
            <button type="button" onclick="excluirDevedor('${response.data[i].id}')" class="btn btn-outline-secondary">
            <i class="fa fa-trash" aria-hidden="true"></i> Deletar Cobrança
          </blockquote>
          <p></p>
        </div>
      </div>
    </div>
  </div>`
            }
        } else {
            document.querySelector("#dados").innerHTML += `
            <div class="row">
             <div class="col">
              <div class="jumbotron">
              <div class="container">
                <p class="lead">
                </p>
                <blockquote class="blockquote">
                  <p class="mb-0">Sem devedores Cadastrados</p>
                </blockquote>
                <p></p>
              </div>
            </div>
          </div>
        </div>`
        }
    }).catch(function (error) {
        console.log(error)
    })
}

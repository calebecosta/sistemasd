document.getElementById("carregar").addEventListener('click', function (event) {
    document.getElementById("dados").innerHTML = "";
    listarDevedor();

})
function editarCampo(id) {

    if (id.includes("devedor")) {
        document.querySelector("#" + id).removeAttribute("disabled")
        
    }
    if (id.includes("divida")) {
        document.querySelector("#" + id).removeAttribute("disabled")
        
    }
    if (id.includes("empresa")) {
        document.querySelector("#" + id).removeAttribute("disabled")

    }
    if (id.includes("data")) {
        document.querySelector("#" + id).removeAttribute("disabled")
       
    }
    if (id.includes("valor")) {
        document.querySelector("#" + id).removeAttribute("disabled")
    }
}

function alterarDevedor(id) {

        axios.post('http://127.0.0.1:3000/cadastro/alterarDevedor', {
            id: id,
            devedor: document.getElementById('devedor' + id).value,
            empresa: document.getElementById('empresa' + id).value,
            valor_divida: document.getElementById("divida" + id).value,
            dt_divida: document.getElementById('data' + id).value
        }).then(function (response) {
            console.log(response.data.Attributes.valor_divida)

            if (response.status == "200") {
                document.getElementById('devedor'+id).setAttribute("value", response.data.Attributes.devedor)
                document.getElementById('devedor'+id).setAttribute("disabled",true)
                document.getElementById("empresa" + id).setAttribute("value", response.data.Attributes.empresa)
                document.getElementById('empresa'+id).setAttribute("disabled",true)
                document.getElementById("divida" + id).setAttribute("value", response.data.Attributes.valor_divida)
                document.getElementById('divida'+id).setAttribute("disabled",true)
                document.getElementById("data" + id).setAttribute("value", response.data.Attributes.dt_divida)
                document.getElementById('data'+id).setAttribute("disabled",true)
                var timestamp = new Date;
                document.querySelector("#att"+id).textContent =("Ultima atualização ás : "+timestamp.toLocaleString('pt-Br'))

            }

        }).catch(function (error) {
           console.log(error)
        })
    }



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
        if (response.status == "200" && response.data.length !== 0) {
            let div = ``;
            let i;
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
          <a>Devedor:</a>
          <div class="input-group mb-3">
           <div class="input-group-prepend">
           <span class="input-group-text" id="basic-addon1"><button id="btn-devedor" onclick="editarCampo('devedor${response.data[i].id}')" type="button" class="btn"><span class="oi oi-pencil"></span></button></span>
          </div>
          <input type="text" class="form-control" id="devedor${response.data[i].id}" value="${response.data[i].devedor}" disabled="true" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div><a>Nome da empresa:</a></div>
            <div class="input-group mb-3">
         <div class="input-group-prepend">
         <span class="input-group-text" id="basic-addon1"><button type="button" onclick="editarCampo('empresa${response.data[i].id}')" class="btn"><span id="btn-empresa" class="oi oi-pencil"></span></button></span>
          </div>
          <input type="text" class="form-control" id="empresa${response.data[i].id}" value="${response.data[i].empresa}" disabled="true" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div><a>Valor da Divida:</a></div>
            <div class="input-group mb-3">
         <div class="input-group-prepend">
         <span class="input-group-text" id="basic-addon1"><button type="button" onclick="editarCampo('divida${response.data[i].id}')" class="btn"><span id="btn-divida" class="oi oi-pencil"></span></button></span>
          </div>
          <input type="text" class="form-control"  id="divida${response.data[i].id}" value="R$${response.data[i].valor_divida}" disabled="true" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div><a>Data da Divida:</a></div>
            <div class="input-group mb-3">
         <div class="input-group-prepend">
         <span class="input-group-text" id="basic-addon1"><button type="button" onclick="editarCampo('data${response.data[i].id}')" class="btn"><span id="btn-data" class="oi oi-pencil"></span></button></span>
          </div>
          <input type="date" class="form-control" id="data${response.data[i].id}" value="${response.data[i].dt_divida}" disabled="true" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <button type="button" onclick="excluirDevedor('${response.data[i].id}')" class="btn btn-outline-secondary">
            <span class="oi oi-delete"></span></span>Deletar Cobrança
            <button type="button" id="salvar" onclick="alterarDevedor('${response.data[i].id}')" class="btn btn-outline-secondary">
            <span class="oi oi-circle-check"></span>Salvar Edições
          </blockquote>
          <p></p>
          <blockquote class="blockquote mb-0">
          <p id="att${response.data[i].id}" class="blockquote-footer">Ultima atualização em : <cite title="Source Title"></cite></p>
        </blockquote>
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

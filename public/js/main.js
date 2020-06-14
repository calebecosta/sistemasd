document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrarDevedor();
})

function cadastrarDevedor(){
    var devedor = {
        "devedor": document.getElementById('devedor').value,
        "empresa": document.getElementById('empresa').value,
        "valor_divida": "R$"+document.getElementById('valor_divida').value,
        "dt_divida": document.getElementById('dt_divida').value
    }
    axios.post('http://127.0.0.1:3000/cadastro/novaDivida',{
        devedor
    }).then(function(response){
        if(response.status == "200"){
            window.alert(response.data.success)
        }
    }).catch(function(error){
        window.alert(error)
    })
}


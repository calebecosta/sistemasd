document.getElementById("carregar").addEventListener('click', function (event) {
    listarDevedores();
})

function listarDevedores() {

    axios.get('http://127.0.0.1:3000/listarDevedores', {

    }).then(function (response) {
        if (response.status == "200") {
            console.log(response.data)
        }
    }).catch(function (error) {
        console.log(error)
    })
}

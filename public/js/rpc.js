function mandarNome(){ 
    		
  // let result = document.querySelector('.result'); 
   let nome = document.querySelector('#nome'); 
  // let email = document.querySelector('#email'); 
    let xhr = new XMLHttpRequest(); 
    let url="/rpc"; 
      xhr.open("POST", url, true); 
      xhr.setRequestHeader("Content-Type", "application/json"); 
      xhr.onreadystatechange = function () { 
          let resp = this.responseText;
          if (xhr.readyState === 4 && xhr.status === 200 ) {    
            console.log(xhr.status);              
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'ok',
              showConfirmButton: false,
              timer: 1500
            })
          //     result.innerHTML = this.responseText; 
          } else{

            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'error',
              showConfirmButton: false,
              timer: 1500
            })

          }
      }; 
      // Converting JSON data to string 
     var data = JSON.stringify({ "nome": nome.value, "method" : "rpc" }); 
      xhr.send(data); 
    }
  
  
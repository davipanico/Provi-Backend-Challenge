const axios = require('axios')

const obj = {
    infos: {
        addres: {
            cep: '04052030',
            street: 'Rua Orissanga',
            city: 'São Paulo'
        }
    }
}

async function cepCheck (cep, street, city) {
    const data = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
 
    if(street != data.data.logradouro) {
        return false
    }else if(city != data.data.localidade){
        return false
    } else {
        return true
    }

}

/*cepCheck(obj)
  .then(function(resultado){
      console.log("Meu resultado é", resultado);
  })
  .catch(function(){
      console.log("Error");
  });*/

module.exports = cepCheck;


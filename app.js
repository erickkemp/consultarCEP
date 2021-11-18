var submitButton = document.querySelector('#app form button');
var zipCodeField = document.querySelector('#app form input');
var content = document.querySelector('#app main');

submitButton.addEventListener("click", run);

function run (event) {
    event.preventDefault() // nao deixar atualizar quando estar digitando

    var zipCode = zipCodeField.value;

    // remover pontos
    zipCode = zipCode.replace(' ', ''); // caracter digitado / carater substituido
    zipCode = zipCode.replace('.', '');
    zipCode = zipCode.trim(); // tirar os espaços

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        if (response.data.erro){
            throw new Error("CEP invalido");
        }

        content.innerHTML = "";
        createLine(response.data.logradouro);
        createLine(response.data.localidade);
        createLine(response.data.uf);
        createLine(response.data.bairro);
    })
    .catch(function (error) {
        createLine("ops, algo deu errado!");
    })

}

function createLine(text){
    var line = document.createElement('p');
    var text = document.createTextNode(text);

    line.appendChild(text);
    content.appendChild(line);
}
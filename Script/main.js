const crianca = document.querySelectorAll('input[name="crianca"]');

crianca.forEach(input => {
    input.addEventListener('change',() =>{
        const criancaValor = document.querySelector('input[name="crianca"]:checked').value;
        const qtdCrianca = document.getElementById("divQtdCrianca")
    
        if (criancaValor == "sim" ){
            qtdCrianca.classList.remove("hidden")
        }else{
            qtdCrianca.classList.add("hidden")
        }
    
    })
})

const qtdCriancasInput = document.querySelector('#qtdCriancas');
const divInput = document.querySelector('#divInput');

qtdCriancasInput.addEventListener('input', function() {
  let inputValue = this.value.replace(/[^0-9]/g, '');
  // Define o input como inválido se for maior que 1 caracter ou se for maior que 5
  this.classList.toggle('invalid', !Number.isInteger(+inputValue) || inputValue > 5);
  // Cria os inputs de nome se o valor for maior que 0 e menor ou igual a 5 e for válido
  divInput.innerHTML = '';
  if (+inputValue > 0 && +inputValue <= 5 && Number.isInteger(+inputValue)) {
    for (let i = 1; i <= +inputValue; i++) {
      const inputNome = document.createElement('input');
      inputNome.type = 'text';
      inputNome.classList.add('inputNomeCrianca');
      inputNome.id = `crianca${i}`;
      inputNome.placeholder = `Nome Completo Criança ${i.toString().padStart(2, '0')}`;
      divInput.appendChild(inputNome);
    }
  }
});

// Impede a entrada de letras e caracteres especiais no input
qtdCriancasInput.addEventListener('keydown', (event) => {
  // Permite o apagar do número digitado
  if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab') {
    return;
  }
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
});

// Remove a classe "invalid" do input ao voltar a ficar vazio
qtdCriancasInput.addEventListener('blur', () => {
  if (this.value === '' || +this.value <= 5) {
    this.classList.remove('invalid');
  }
});

// Seleciona o input de nome
const nomeInput = document.querySelector('#nome');

// Adiciona o evento blur ao input de nome para validar se contém números
nomeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        return;
      }
    if (/[0-9]/.test(event.key)) {
        event.preventDefault();
      }
});

// Seleciona o input radio de presença
const presencaInput = document.querySelectorAll('input[name="presenca"]');
let presencaValor = '';

// Adiciona o evento change ao input radio de presença para armazenar o valor selecionado
presencaInput.forEach(input => {
    input.addEventListener('change',() =>{
        presencaValor = document.querySelector('input[name="presenca"]:checked').value;
    })
});

// Seleciona o botão de enviar
const btnEnviar = document.getElementById('btnEnviar');

// Adiciona o evento click ao botão de enviar
btnEnviar.addEventListener('click', () => {
  // Seleciona os inputs de nome das crianças
  const inputNomesCriancas = document.querySelectorAll('.inputNomeCrianca');
  
  // Verifica se todos os inputs estão preenchidos e não são inválidos
  let inputsValidos = true;
  inputNomesCriancas.forEach(input => {
    if (input.value === '' || input.classList.contains('invalid')) {
      inputsValidos = false;
    }
  });

    const valorCrianca = document.querySelector('input[name="crianca"]').value;
    if (nomeInput.value === '' || nomeInput.classList.contains('invalid') || presencaValor === '' || !inputsValidos) {
        alert('Por favor, preencha todos os campos corretamente.');
    } else {
        enviarResposta();
    }
});

// Função que será chamada ao clicar no botão enviar
const enviarResposta = () => {
  alert('Resposta enviada!');
  btnEnviar.innerHTML = "Resposta Enviada!"
  btnEnviar.disabled = true;
  btnEnviar.style = "background-color: #37825A; color: #ffffff;"

  // Código para enviar a resposta para o servidor
  const resposta = {
    nome: document.querySelector('#nome').value,
    presenca: document.querySelector('input[name="presenca"]:checked').value,
    crianca: document.querySelector('input[name="crianca"]:checked').value,
    qtdCriancas: document.querySelector('#qtdCriancas').value,
    nomesCriancas: []
  };
  
  // Preenche o array de nomes das crianças, caso haja
  const inputsNomeCrianca = document.querySelectorAll('.inputNomeCrianca');
  inputsNomeCrianca.forEach(input => {
    if (input.value !== '') {
      resposta.nomesCriancas.push(input.value);
    }
  });
  
  // Lê o arquivo JSON
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../lista.json');
  xhr.onload = function() {
    const dados = JSON.parse(this.responseText);
    // Adiciona a nova resposta ao final do array
    dados.push(resposta);
    console.log(dados)
//NAO TA FUNCINANDO    
    // Escreve o array de volta para o arquivo JSON
    const xhr2 = new XMLHttpRequest();
    xhr2.open('PUT', '../lista.json');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.onload = function() {
      console.log('Dados salvos com sucesso!');
    };
    xhr2.send(JSON.stringify(dados));
  };
  xhr.send();
}


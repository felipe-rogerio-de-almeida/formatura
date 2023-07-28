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

const divInputsRadio = document.querySelector('#divInputsRadio');

// Adiciona o evento change ao input radio de presença para armazenar o valor selecionado
presencaInput.forEach(input => {
    input.addEventListener('change',() =>{
        presencaValor = document.querySelector('input[name="presenca"]:checked').value;
        if (input.value === 'sim') {
          divInputsRadio.classList.remove('hidden');
        } else {
          divInputsRadio.classList.add('hidden');
          const inputNao = document.querySelector('input[name="crianca"][value="nao"]');
          inputNao.checked = true;
          inputNao.dispatchEvent(new Event('change'));
        }
    })
});

const crianca = document.querySelectorAll('input[name="crianca"]');

crianca.forEach(input => {
    input.addEventListener('change',() =>{
        const criancaValor = document.querySelector('input[name="crianca"]:checked').value;
        const qtdCrianca = document.getElementById("divQtdCrianca")
        const divInputCrianca = document.getElementById("divInput")
        if (criancaValor == "sim" ){
            qtdCrianca.classList.remove("hidden")
            divInputCrianca.classList.remove("hidden")
        }else{
            const qtdCriancasInput = document.querySelector('#qtdCriancas');
            qtdCriancasInput.value = ''
            qtdCrianca.classList.add("hidden")
            divInputCrianca.classList.add("hidden")
            qtdCriancasInput.dispatchEvent(new Event('input'));
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
      console.log(inputsValidos)
    }
  });

  const valorCrianca = document.querySelector('input[name="crianca"]').value;
  const criancaNao = document.querySelector('input[name="crianca"]:checked').value;
  if (nomeInput.value === '' || nomeInput.classList.contains('invalid') || presencaValor === '' || (presencaValor !== '' && valorCrianca === '') || (criancaNao !== 'nao' && valorCrianca === '') || !inputsValidos) {
    alert('Por favor, preencha todos os campos corretamente.');
  } else {
    enviarResposta();
  }

});

function capitalizeWords(input) {
  return input.toLowerCase().replace(/\b\w/g, function(match) {
    return match.toUpperCase();
  });
}


// Função que será chamada ao clicar no botão enviar
const enviarResposta = () => {

  // Código para enviar a resposta para o servidor
  const resposta = {
    nome:  capitalizeWords(document.querySelector('#nome').value),
    presenca: document.querySelector('input[name="presenca"]:checked').value,
    crianca: document.querySelector('input[name="crianca"]:checked').value,
    qtdCriancas: document.querySelector('#qtdCriancas').value,
    nomesCriancas: []
  };
  
  if (resposta.crianca === 'nao') {
    resposta.qtdCriancas = 0;
    resposta.nomesCriancas = ['-'];
  } else {
    resposta.qtdCriancas = document.querySelector('#qtdCriancas').value;
    // código para preencher o array nomesCriancas com os nomes das crianças
    // Preenche o array de nomes das crianças, caso haja
    const inputsNomeCrianca = document.querySelectorAll('.inputNomeCrianca');
    inputsNomeCrianca.forEach(input => {
      resposta.nomesCriancas.push(capitalizeWords(input.value));
    });
  }
  
  const dados = [];
    dados.push(resposta);
    console.log(dados);
  
    const xhr = new XMLHttpRequest();
    const novosDados = JSON.stringify(dados);
    
    xhr.open('POST', './Script/salvar.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Dados salvos com sucesso!');
        alert('Resposta enviada!');
        btnEnviar.innerHTML = "Resposta Enviada!"
        btnEnviar.disabled = true;
        btnEnviar.style = "background-color: #37825A; color: #ffffff;"
      } else {
        console.error('Erro ao salvar os dados:', xhr.statusText);
        alert("Falha ao se comunicar com o servidor! Atualize a página e tente novamente!")
      }
    };
    
    xhr.onerror = function() {
      console.error('Erro na requisição.');
      alert("Falha ao se comunicar com o servidor! Atualize a página e tente novamente!")

    };
    
    xhr.setRequestHeader('Cache-Control', 'no-cache')
    xhr.send('dados=' + novosDados);
}


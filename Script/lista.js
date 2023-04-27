// Função para atualizar a tabela com os dados fornecidos
function atualizarTabela(dados, filtro = '') {
  const tabelaCorpo = document.getElementById("tabela-corpo");
  tabelaCorpo.innerHTML="";
  
  // Filtra os dados com base no valor do campo de entrada de texto
  const dadosFiltrados = dados.filter(function(item) {
    return item.nome.toLowerCase().includes(filtro.toLowerCase());
  });

  // Ordena os dados por nome
  dadosFiltrados.sort(function(a, b) {
    if (a.nome < b.nome) {
      return -1;
    } else if (a.nome > b.nome) {
      return 1;
    } else {
      return 0;
    }
  });

  dadosFiltrados.forEach(function(item) {
      const tr = document.createElement("tr");
      const tdNome = document.createElement("td");
      tdNome.textContent = item.nome;
      const tdPresenca = document.createElement("td");
      tdPresenca.textContent = item.presenca;
      const tdCrianca = document.createElement("td");
      tdCrianca.textContent = item.crianca;
      const tdQtdCriancas = document.createElement("td");
      tdQtdCriancas.textContent = item.qtdCriancas;
      const tdNomesCriancas = document.createElement("td");
      item.nomesCriancas.forEach(function(nome) {
          const span = document.createElement("span");
          span.textContent = nome;
          tdNomesCriancas.appendChild(span);
          tdNomesCriancas.appendChild(document.createElement("br"));
      });
    tr.appendChild(tdNome);
    tr.appendChild(tdPresenca);
    tr.appendChild(tdCrianca);
    tr.appendChild(tdQtdCriancas);
    tr.appendChild(tdNomesCriancas);
    tabelaCorpo.appendChild(tr);
  });
}


document.querySelector("#search-input").addEventListener("input", function() {
  const filtro = this.value;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const dados = JSON.parse(this.responseText);
      // Atualiza a tabela com os dados filtrados
      atualizarTabela(dados, filtro);
    }
  };
  xmlhttp.open("GET", "lista.json", true);
  xmlhttp.send();
});


// Manipulador de evento para o botão "Ordenar por nome"
  document.querySelector("#ordenar-nome").addEventListener("click", function() {    
  document.querySelector("#filtrar-presenca-nao").classList.remove("active");
  document.querySelector("#filtrar-presenca-sim").classList.remove("active");
  document.querySelector("#ordenar-nome").classList.add("active");
  document.querySelector("#imprimir-lista").classList.remove("active");
  // Faz a solicitação AJAX para obter os dados em JSON
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const dados = JSON.parse(this.responseText);
        // Ordena os dados por nome
        dados.sort(function(a, b) {
          if (a.nome < b.nome) {
            return -1;
          } else if (a.nome > b.nome) {
            return 1;
          } else {
            return 0;
          }
        });
        // Atualiza a tabela com os dados ordenados
        atualizarTabela(dados);
      }
    };
    xmlhttp.open("GET", "lista.json", true);
    xmlhttp.send();
});
  
// Manipulador de evento para o botão "Confirmados"
document.querySelector("#filtrar-presenca-sim").addEventListener("click", function() {
  document.querySelector("#filtrar-presenca-nao").classList.remove("active");
  document.querySelector("#filtrar-presenca-sim").classList.add("active");
  document.querySelector("#ordenar-nome").classList.remove("active");
  document.querySelector("#imprimir-lista").classList.remove("active");

  // Faz a solicitação AJAX para obter os dados em JSON
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const dados = JSON.parse(this.responseText);
    // Filtra os dados para mostrar apenas os confirmados
    const confirmados = dados.filter(function(item) {
      return item.presenca.toLowerCase() === "sim";
    });
    // Atualiza a tabela com os dados filtrados
    atualizarTabela(confirmados);
  }
};
xmlhttp.open("GET", "lista.json", true);
xmlhttp.send();
});

// Manipulador de evento para o botão "Não confirmados"
document.querySelector("#filtrar-presenca-nao").addEventListener("click", function() {
  document.querySelector("#filtrar-presenca-nao").classList.add("active");
  document.querySelector("#filtrar-presenca-sim").classList.remove("active");
  document.querySelector("#ordenar-nome").classList.remove("active");
  document.querySelector("#imprimir-lista").classList.remove("active");
  // Faz a solicitação AJAX para obter os dados em JSON
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const dados = JSON.parse(this.responseText);
      // Filtra os dados para mostrar apenas os não confirmados
      const naoConfirmados = dados.filter(function(item) {
        return item.presenca.toLowerCase() === "nao";
      });
      // Atualiza a tabela com os dados filtrados
      atualizarTabela(naoConfirmados);
    }
  };
  xmlhttp.open("GET", "lista.json", true);
  xmlhttp.send();
});

// Manipulador de evento para o botão "Imprimir lista"
document.querySelector("#imprimir-lista").addEventListener("click", function() {
  document.querySelector("#filtrar-presenca-nao").classList.remove("active");
  document.querySelector("#filtrar-presenca-sim").classList.remove("active");
  document.querySelector("#ordenar-nome").classList.remove("active");
  document.querySelector("#imprimir-lista").classList.add("active");
  
  window.print();
});



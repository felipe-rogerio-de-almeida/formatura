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
  const tabela = document.querySelector("table");
  const botoes = document.querySelector(".botoes");
  const search = document.querySelector(".search-container");
  const titulo = document.querySelector('.titulo');
  const corpo = document.querySelectorAll('td');
  const cabecalho = document.querySelectorAll('th');

  // Verifica se o botão "Filtrar Presença - Sim" está ativado
  const filtrarPresencaSim = document.querySelector("#filtrar-presenca-sim").classList.contains("active");

  // Oculta as colunas que não serão impressas se o filtro estiver ativado
  if (filtrarPresencaSim) {
    const colunasOcultas = tabela.querySelectorAll("th:not(:nth-child(1)):not(:nth-child(5)), td:not(:nth-child(1)):not(:nth-child(5))");
    colunasOcultas.forEach(function(coluna) {
      coluna.style.display = "none";
    });
  }


  // Oculta os elementos que não serão impressos
  tabela.style.display = "block";
  corpo.forEach((c) => {
    c.classList.add('imprimir')
  })

  cabecalho.forEach((c) => {
    c.classList.add('imprimirCabecalho')
  })
  titulo.classList.add('imprimirTitulo')
  botoes.style.display = "none";
  search.style.display = "none";


  // Aciona a impressão da página
  window.print();

  // Restaura a exibição dos elementos após a impressão
  tabela.style.display = "";
  botoes.style.display = "";
  search.style.display = "";
  corpo.forEach((c) => {
    c.classList.remove('imprimir')
  })
  cabecalho.forEach((c) => {
    c.classList.remove('imprimirCabecalho')
  })
  titulo.classList.remove('imprimirTitulo')

  if (filtrarPresencaSim) {
    colunasOcultas.forEach(function(coluna) {
      coluna.style.display = "";
    });
    }
  
  });


const btnImprimir = document.querySelector("#imprimir-lista")

btnImprimir.addEventListener("mouseover", ()=>{
  btnImprimir.style = "color:#D6BB76"
})

btnImprimir.addEventListener("mouseout", ()=>{
  btnImprimir.style = "color:#ffffff"
})

const btndowload = document.querySelector("#download")

btndowload.addEventListener("mouseover", ()=>{
  btndowload.style = "color:#D6BB76"
})

btndowload.addEventListener("mouseout", ()=>{
  btndowload.style = "color:#ffffff"
})

document.querySelector("#download").addEventListener("click", function() {
  const tabelaCorpo = document.getElementById("tabela-corpo");

  // Cria uma nova planilha
  const workbook = XLSX.utils.book_new();

  // Cria um objeto worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([]);

  // Obtém os cabeçalhos das colunas do HTML
  const headers = [];
  const headerElements = document.querySelectorAll("#cabecalho th");
  headerElements.forEach(function(headerElement) {
    headers.push(headerElement.textContent);
  });

  // Insere os cabeçalhos das colunas na primeira linha do worksheet
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

  // Converte a tabela de corpo em um array de arrays (dados da tabela)
  const dadosTabela = [];
  const linhasTabela = tabelaCorpo.querySelectorAll("tr");
  linhasTabela.forEach(function(linha) {
    const colunasLinha = linha.querySelectorAll("td");
    const dadosLinha = [];
    colunasLinha.forEach(function(coluna) {
      dadosLinha.push(coluna.textContent);
    });
    dadosTabela.push(dadosLinha);
  });

  // Adiciona os dados da tabela ao worksheet após o cabeçalho
  XLSX.utils.sheet_add_aoa(worksheet, dadosTabela, { origin: "A2" });

  // Adiciona o worksheet ao workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lista");

  // Salva o workbook em formato Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Cria um objeto Blob a partir do buffer Excel
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  // Define o nome do arquivo
  const fileName = "listaFormatura.xlsx";

  // Cria um link de download e simula o clique nele
  if (navigator.msSaveBlob) {
    // Para o Internet Explorer
    navigator.msSaveBlob(blob, fileName);
  } else {
    // Para outros navegadores
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // URL do objeto Blob
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});

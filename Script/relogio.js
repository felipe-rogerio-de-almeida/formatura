// Define a data do evento
const dataEvento = new Date('2023-07-08T21:00:00');

// Função para atualizar o relógio a cada segundo
function atualizarRelogio() {
  // Obtém a data e hora atual
  const dataAtual = new Date();
  
  // Calcula o tempo restante até o evento
  const tempoRestante = dataEvento.getTime() - dataAtual.getTime();
  
  // Calcula os dias, horas e minutos restantes
  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  
  // Atualiza os elementos HTML com os novos valores
  document.getElementById('dia1').innerHTML = Math.floor(dias / 10);
  document.getElementById('dia2').innerHTML = dias % 10;
  document.getElementById('hora1').innerHTML = Math.floor(horas / 10);
  document.getElementById('hora2').innerHTML = horas % 10;
  document.getElementById('minuto1').innerHTML = Math.floor(minutos / 10);
  document.getElementById('minuto2').innerHTML = minutos % 10;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);

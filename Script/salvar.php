<?php
if (isset($_POST['dados'])) {
  $dados = json_decode($_POST['dados'], true);
  
  header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
  header('Pragma: no-cache');
  header('Expires: 0');
  
  // Obtém um bloqueio exclusivo no arquivo
  $arquivo = fopen('../lista.json', 'c');
  flock($arquivo, LOCK_EX);

  // Lê o conteúdo atual do arquivo e decodifica em um array
  $lista = array();
  if (filesize('../lista.json') > 0) {
    $lista = json_decode(file_get_contents('../lista.json'), true);
  }

  // Adiciona os novos dados ao final da lista existente
  foreach ($dados as $item) {
    // Remove espaços extras e transforma o nome em formato correto: primeira letra de cada palavra em maiúscula, restante em minúscula
    $item['nome'] = mb_convert_case(trim($item['nome']), MB_CASE_TITLE, 'UTF-8');
    
    $lista[] = $item;
  }

  // Reescreve o arquivo com a lista atualizada
  file_put_contents('../lista.json', json_encode($lista));

  // Libera o bloqueio e fecha o arquivo
  flock($arquivo, LOCK_UN);
  fclose($arquivo);
}
?>
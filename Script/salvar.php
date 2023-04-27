<?php
if (isset($_POST['dados'])) {
  $dados = json_decode($_POST['dados']);
  file_put_contents('../lista.json', json_encode($dados));
}
?>
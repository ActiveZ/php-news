<?php
//fichier sur le serveur
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTION');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';

// récupération des articles
    $req = $pdo->prepare('SELECT * FROM news, news_infos WHERE news.id=news_infos.idNews');
    $req->execute();
    $data = $req->fetchAll();
    
    echo json_encode($data);

?>
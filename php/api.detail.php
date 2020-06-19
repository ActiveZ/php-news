<?php
//fichier sur le serveur
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTION');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';

if (!empty($_GET['idPage'])) {
    $idPage = $_GET['idPage'];
    
    // récupération de l'article
    // $req = $pdo->prepare('SELECT * FROM news WHERE news.id = :id');
    $req = $pdo->prepare('SELECT * FROM news, news_infos WHERE news.id = :id AND news.id = news_infos.idNews');
    //$req = $pdo->prepare('SELECT * FROM news INNER JOIN news_infos ON news.id = :id AND news.id = news_infos.idNews'); //version INNER JOIN
    $req->execute(['id' => $idPage]);
    $data = $req->fetch();
    
    echo json_encode($data);

}

?>
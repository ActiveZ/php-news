<?php
//fichier sur le serveur
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTION');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';

$_POST = json_decode(file_get_contents('php://input'), true);

// récupération des titres des news
if ($_POST['action'] === 'getMessages') {
    $req = $pdo->prepare('SELECT * FROM news ORDER BY id DESC LIMIT 0,100');
    $req->execute();
    $data = $req->fetchAll();
    
    echo json_encode($data);
}

// enregistrement titre + contenu de la news dans la bdd
elseif ($_POST['action'] === 'sendMessages') {
    $req = $pdo->prepare('INSERT INTO news (titre, contenu) VALUES (:titre, :message)');
    $req->execute([
        'titre' => $_POST['titre'],
        'message' => $_POST['message'],
    ]);

    //enregistrement dans la table news-infos
    $req = $pdo->prepare('INSERT INTO news_infos (auteur, idNews) VALUES (:auteur, :idNews)');
    $result=$req->execute([
        'auteur' =>'Arnaud',
        'idNews' => $pdo->lastInsertId() //id de l'enregistrement en cours
    ]);
}
?>
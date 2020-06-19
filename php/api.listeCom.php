<?php
//fichier sur le serveur
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTION');
// header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';

$_POST = json_decode(file_get_contents('php://input'), true);

// récupération de la liste des commentaires pour l'article id
$req = $pdo->prepare('SELECT * FROM commentaires WHERE idArticle = :idArticle ORDER BY id DESC LIMIT 0,100');
$req->execute(['idArticle' => $_POST['idarticle']]);
$data = $req->fetchAll();

echo json_encode($data);

?>
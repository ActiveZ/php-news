<?php
//fichier sur le serveur
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTION');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: application/json');

require_once 'bdd.php';

$_POST = json_decode(file_get_contents('php://input'), true);

if($_POST['auteur'] === "" || $_POST['contenu'] === "") return;

//enregistrement dans la table commentaires
$req = $pdo->prepare('INSERT INTO commentaires (auteur, contenu, idArticle) VALUES (:auteur, :contenu, :idArticle)');
$req->execute([
    'idArticle' => ($_POST['idArticle']),
    'auteur' => htmlspecialchars($_POST['auteur']), // pour éviter l'injection SQL
    'contenu' => htmlspecialchars($_POST['contenu'])
]);

?>
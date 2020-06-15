<?php

require_once 'bdd.php';
echo ("ok");

if (!empty($_GET['idPage'])) {
    $idPage = $_GET['idpage'];
    echo ("idPage: " . $idPage);
}
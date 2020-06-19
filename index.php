<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <title>Page principale</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/css.css">
    </head>
    <body>
        
        <div id="divIndex"></div>
        
        <div id="divDetail">
            <div id="divArticle"></div>
            
            <div id=divCommentaire>
                <h2>AJOUTER UN COMMENTAIRE</h2>
                <p><label for="com">Auteur</label> : <input type="text" name="com" id="auteurCom" placeholder="Nom de l'auteur"></p>
                Contenu: <br>
                <textarea id="contenuCom" rows="5" placeholder="Votre commentaire"></textarea>
                <p><button onclick="envoyerCom()">Envoyer</button></p>
                <table  id = "tableCom"></table>
            </div>
        </div>
        <script src="index.js"></script>
    </body>
</html>
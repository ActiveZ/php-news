<!DOCTYPE html>

    <head>
        <meta charset="utf-8">
        <title>News-Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/css.css">
    </head>

    <body>
        
        <div id="main">

        <div id='header'>
            <h1>GESTIONNAIRE DE NEWS</h1>
        </div>
        <h2>AJOUTER UN ARTICLE</h2>
        <p><label for="titre">Titre</label> : <input type="text" name="titre" id="titre"></p>

        Contenu: <br>
        <textarea id="contenu" rows="10"></textarea>
        
        <p>
            <button onclick="envoyer()">Envoyer</button>
        </p>

        <table  id = "tableTitre"></table>

    </div>

        
    <script src="admin.js"></script>
    </body>
</html>
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
            <p><label for="titre">Titre</label> : <input type="text" name="titre" id="titre"></p>

            Contenu: <br>
            <textarea id="contenu" name="" rows="10"></textarea>
            
            <p>
                <button onclick="envoyer()">Envoyer</button>
                <!-- <button onclick="recevoir()">Recevoir</button> -->
            </p>

            Les titres: <br>
            <textarea id="listeTitre" name="" rows="10"></textarea>

        </div>

        
        <script src="admin.js"></script>
    </body>
</html>
//fichier sur le pc client 	
var idNews=0; // id de l'article en cours

recevoir();

////////////////////////////////////////////////////////////////////////////////////

//reception des articles
async function recevoir () {
    let url = "http://localhost/news/php/api.index.php";
    //let url = "http://frugysoft.free.fr/news/php/api.index.php // serveur free frugysoft

    let data;

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        }
    });
      
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
        //console.log(data);

        let libelle = "<h1 id='titreListe'>LISTE DES ARTICLES</h1>";
        for (let d in data) {
            let date = new Date(data[d].date);
            libelle += "<div id='divMonArticle' onClick='afficherArticle(" + data[d].id + ")'>";
                libelle += "<p class='libelle'>Le " + date.toLocaleString() + ", " + data[d].auteur + " a écrit:" + "</p>";
                libelle += "<p class='resume'>" + data[d].contenu + "</p>";
            libelle += "</div>";
        }
        document.getElementById('divIndex').innerHTML=libelle;
    }
    else { 
        //TODO: ttt erreur response
    }

    // fonction récursive
    setTimeout(() => {
        recevoir()
    }, 500)
}

//////////////////////////////////////////////////////////////////////////////////////////////

async function afficherArticle (id) {
    let url = "http://localhost/news/php/api.detail.php";   
    //let url = "http://frugysoft.free.fr/news/php/api.detail.php/?idPage=" + id // serveur free frugysoft
    
    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idPage': id
        })
    });
      
    response = await fetch(request);
    if (response.ok) {
        let data = await response.json();
        let date = new Date(data.date);
        let article = "<p class= 'libelle'>Le " + date.toLocaleString() + ", " + data.auteur + " a écrit:" + "</p>";
        article += "<p class='resume'>" + data.contenu + "</p>";
        article += "<button class='btHome' onclick='home()'>Retour</button>";
    
        document.getElementById('divArticle').innerHTML=article;
        document.getElementById('divArticle').style.display = "flex";
        document.getElementById('divCommentaire').style.display = "block";
        document.getElementById('divIndex').style.display = "none";

        idNews = data.idNews;
        // recevoir les commentaires de l'article en cours
        recevoirCom(data.idNews);
    }
    else { 
        //TODO: ttt erreur response
    }
   
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// retour page index
function home() {
    document.getElementById('divArticle').style.display = "none";
    document.getElementById('divCommentaire').style.display = "none";
    document.getElementById('divIndex').style.display = "flex";
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// envoyer commentaire à la bdd
function envoyerCom() {
    let url = "http://localhost/news/php/api.recordCom.php"; //serveur de ce pc
    let contenu = document.getElementById('contenuCom').value;
    let auteur = document.getElementById('auteurCom').value;
    if (auteur==="" || contenu === "") return;

    // console.log("data: " + auteur + contenu );
    // alert ("Votre commentaire a bien été enregistré");

    let request = new Request(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idArticle': idNews,
            'auteur': auteur,
            'contenu': contenu
        })
    });

    fetch(request);

    document.getElementById('contenuCom').value = "";
    document.getElementById('auteurCom').value = "";

}

///////////////////////////////////////////////////////////////////////////////////////

//reception de la liste des commentaires de l'article en cours (id)
async function recevoirCom (id) {
    console.log('id: ' + id);
    let url = "http://localhost/news/php/api.listeCom.php";
    let data;

    let request = new Request(url, {
        method: 'POST',
        headers:{
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'idarticle': id
        })
    });
    
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
    }

    table ="<tr><th>COMMENTAIRES DE CET ARTICLE</th></tr>";

    for (let d in data) {
        let date = new Date(data[d].date);
        table += "<tr><td>" +
        "Le " + date.toLocaleString() + ", " + data[d].auteur + " a écrit: </td>" +
            "<td>" + data[d].contenu + "</td>" +
            "</td></tr>";
    }

    document.getElementById('tableCom').innerHTML=table;

    // fonction récursive
    setTimeout(() => {
        recevoirCom(idNews)
    }, 500)
}
//fichier sur le pc client 	

recevoir();

////////////////////////////////////////////////////////////////////////////////////

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

        let libelle = "";
        for (let d in data) {
            let date = new Date(data[d].date);
            libelle += "<div onClick='afficherArticle(" + data[d].id + ")'>";
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
    let url = "http://localhost/news/php/api.detail.php/?idPage=" + id;   
    //let url = "http://frugysoft.free.fr/news/php/api.detail.php/?idPage=" + id // serveur free frugysoft
    
    let request = new Request(url, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
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
    // let auteur = document.getElementById('auteur').value;
    let contenu = document.getElementById('contenuCom').value;
    if (contenu === "") return;

    // console.log("data: " + contenu );
    alert ("Votre commentaire a bien été enregistré");

    let request = new Request(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // 'titre': titre,
            'contenu': contenu
        })
    });

    fetch(request);

    document.getElementById('contenuCom').value = "";
    // document.getElementById('titre').value = "";
    // document.getElementById('contenu').value = "";

}
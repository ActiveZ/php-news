//fichier sur le pc client 	

recevoir();

////////////////////////////////////////////////////////////////////////////////////

async function recevoir () {
    let url = "http://localhost/news/php/api.index.php";
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
    document.getElementById('divIndex').style.display = "flex";
}
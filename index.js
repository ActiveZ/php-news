//fichier sur le pc client 	

var url = "http://localhost/news/php/api.index.php";

recevoir();


async function recevoir () {
    let data;
    let msg = "";

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        }
    });
      
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
    }
    //console.log(data);

    var libelle = ""
     for (let d in data) {
        let date = new Date(data[d].date);
        libelle += "<div class='pIndex' onClick='afficherArticle(" + data[d].id + ")'>";
            // libelle += "<span class='libelle'>Le " + date.toLocaleString() + ", " + data[d].auteur + " a écrit:" + "</span>";
            libelle += "<p class='libelle'>Le " + date.toLocaleString() + ", " + data[d].auteur + " a écrit:" + "</p>";
            libelle += "<p class='resume'>" + data[d].contenu + "</p>";
        libelle += "</div>";
    }

    document.getElementById('divIndex').innerHTML=libelle;

    setTimeout(() => {
        recevoir()
    }, 500)
}


function afficherArticle (id) {
    alert (id);
    location ("http://localhost/news/article_details.php&idPage=1");
}
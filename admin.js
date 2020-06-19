//fichier sur le pc client 	

var url = "http://localhost/news/php/api.php"; //serveur de ce pc
//var url = "http://frugysoft.free.fr/news/php/api.php"; //serveur free frugysoft


recevoir();

async function envoyer () {
    let titre = document.getElementById('titre').value;
    let contenu = document.getElementById('contenu').value;
    if (titre === "" || contenu === "") return;

    //console.log("data: " + titre + "---" + contenu );

    let request = new Request(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'sendNews',
            'titre': titre,
            'contenu': contenu
        })
    });

    fetch(request);

    document.getElementById('titre').value = "";
    document.getElementById('contenu').value = "";
}


async function recevoir () {
    let data;

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'getNews'
        })
    });
      
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
    }
    console.log(data);
    table ="<tr><th>TITRES</th></tr>";

    for (let d in data) {
        table += "<tr><td>"+
            "<button onclick='supprimer(" + data[d].id + ")'>Supprimer</button>" + 
            "<button onclick='modifier(" + data[d].id + ")'>Modifier</button>" +
            data[d].titre + 
            "</td></tr>";
    }

    document.getElementById('tableTitre').innerHTML=table;

    setTimeout(() => {
        recevoir()
    }, 500)
}


// suppression d'un titre
function supprimer (id) {
    alert ("id: " + id);
}


// modiffication d'un titre
function modifier (id) {
    alert ("id: " + id);
}
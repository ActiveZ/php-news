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
        libelle += "<p class='libelle'>Le " + date.toLocaleString() + ", " + data[d].auteur + " a écrit: <br>" + data[d].contenu + "</p>";
        //     contenu = data[d].contenu;
        //     document.getElementById('contenu').innerHTML=contenu;
    }

    document.getElementById('libelle').innerHTML=libelle;


    setTimeout(() => {
        recevoir()
    }, 500)
}

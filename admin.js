//fichier sur le pc client 	

var url = "http://localhost/news/php/api.php"; //serveur de ce pc

recevoir();

async function envoyer () {
    let titre = document.getElementById('titre').value;
    let message = document.getElementById('message').value;
    if (titre === "" || message === "") return;

    //console.log("data: " + titre + "---" + message );

    let request = new Request(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'sendMessages',
            'titre': titre,
            'message': message
        })
    });

    fetch(request);

    document.getElementById('titre').value = "";
    document.getElementById('message').value = "";
}


async function recevoir () {
    let data;
    let msg = "";

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'getMessages'
        })
    });
      
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
    }
    //console.log(data);
    for (let d in data) {
        // let date = new Date(data[d].dateTimestamp);
        msg += data[d].titre + "\n";
    }

    document.getElementById('listeTitre').innerHTML=msg;

    setTimeout(() => {
        recevoir()
    }, 500)
}
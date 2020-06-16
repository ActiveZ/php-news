afficheArticle(1);

async function afficheArticle (id) {
var url = "http://localhost/news/php/api.detail.php/?idPage=1";

let data;

let request = new Request(url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
});
  
response = await fetch(request);
if (response.ok) {
    data = await response.json();

    console.log(data);

    let date = new Date(data.date);

    let article = "<p class= article'>Le " + date.toLocaleString() + ", " + data.auteur + " a écrit:" + "</p>";
    article += "<p class='resume'>" + data.contenu + "</p>";

     document.getElementById('divArticle').innerHTML=article;
}


}
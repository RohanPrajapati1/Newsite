const API_KEY = "a1e30cbae24f48af9a5bf7776a385ad8";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , () => fetchNews("india"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    
    binddata(data.articles);    
}

function binddata(articles){
    const cardcontainer = document.getElementById('cards-container');
    const newstemplet = document.getElementById('news-card-templet');

    cardcontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
         const cardclone = newstemplet.content.cloneNode(true);
         fillDataIncard(cardclone , article);
         cardcontainer.appendChild(cardclone);
    });
}

function fillDataIncard(cardclone , article){
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;    
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;

   cardclone.firstElementChild.addEventListener('click' , ()=>{
    window.open(article.url , "_blank");
   });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const newsInput = document.getElementById('news-input');

searchButton.addEventListener('click' , () => {
    const query = newsInput.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
})
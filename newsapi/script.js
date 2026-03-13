const API_KEY = "YOUR_API_KEY"
const container = document.getElementById("newsContainer")
const topicSelect = document.getElementById("topicSelect")

async function fetchNews(topic){

container.innerHTML = "Loading..."

try{

const url = `https://gnews.io/api/v4/top-headlines?category=${topic}&lang=en&apikey=${API_KEY}`

const response = await fetch(url)
const data = await response.json()

displayNews(data.articles)

}catch(error){

container.innerHTML = "Failed to load news"

}

}

function displayNews(articles){

container.innerHTML=""

articles.forEach(article=>{

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${article.image}">
<div class="card-content">
<h3>${article.title}</h3>
<p>${article.description || ""}</p>
<a href="${article.url}" target="_blank">Read More</a>
</div>

`

container.appendChild(card)

})

}

/* Load default news when page loads */

fetchNews("technology")

/* Change news when topic changes */

topicSelect.addEventListener("change",()=>{

fetchNews(topicSelect.value)

})
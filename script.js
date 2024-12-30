let API_KEY = "73f79c765b634dfb90da64b9e106e07c";
let API_URL = "https://newsapi.org/v2/everything";

let news = "";
let pages = 1;

let input = document.querySelector(".block__input");
let button = document.querySelector(".button__block");
let ul = document.querySelector(".block__news");
let span = document.querySelector(".spanchik");
let btnLeft = document.querySelector(".btn-1");
let btnRight = document.querySelector(".btn-2");
let pageButtons = document.querySelector(".page-buttons");

button.addEventListener("click", function () {
    let inputValue = input.value;
    if (inputValue && inputValue !== news) {
        news = inputValue;
        pages = 1;
    }
    fetchNews();
});

function fetchNews() {
    let ask = `${API_URL}?q=${news}&page=${pages}&apiKey=${API_KEY}`;
    fetch(ask)
        .then((Response) => Response.json())
        .then((data) => {
            ul.innerHTML = "";
            data.articles.forEach((item) => {
                let newLi = document.createElement("li");
                newLi.classList.add("article-item");
                newLi.innerHTML = `
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                        <article>
                            <img src="${item.urlToImage || 'https://via.placeholder.com/480'}" alt="${item.title}">
                            <h2>${item.title}</h2>
                            <p>Posted by: ${item.author || 'Unknown'}</p>
                            <p>${item.description || 'No description available'}</p>
                        </article>
                    </a>`;
                ul.appendChild(newLi);
            });

            if (data.articles.length === 0) {
                ul.innerHTML = "<li>Новини не знайдено</li>";
            }
            updatePagination(data.totalResults);
        })
        .catch((error) => {
            console.error(error);
        });
}

function updatePagination(totalResults) {
    let totalPages = Math.ceil(totalResults / 6);
    span.textContent = `Сторінка ${pages}`;

    btnLeft.disabled = pages === 1;
    btnRight.disabled = pages >= totalPages;

    renderPageButtons(totalPages);
}

function renderPageButtons(totalPages) {
    pageButtons.innerHTML = ""; 
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
        let pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-btn");
        if (i === pages) pageButton.classList.add("active"); 
        pageButton.addEventListener("click", () => {
            pages = i;
            fetchNews();
        });
        pageButtons.appendChild(pageButton);
    }
}

btnRight.addEventListener("click", function () {
    pages++;
    fetchNews();
});

btnLeft.addEventListener("click", function () {
    pages--;
    fetchNews();
});
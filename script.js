document.body.style.backgroundColor = window.localStorage.getItem("bg-c");

let sBar = document.getElementById('search');
let api_url = "https://api.tvmaze.com/search/shows?q="
let queryResult;

function doSearch() {
    let resultDiv = document.getElementsByClassName('result')[0];
    resultDiv.innerHTML = null;

    queryResult = getResult(api_url + sBar.value);
    queryResult.then((data) => getImageLinks(data));

    addImagesToResult(imgLinks);
}

async function getResult(url) {
    const resp = await fetch(url);
    return resp.json();
}

let imgLinks = [];

function getImageLinks(data) {
    for (let i of data) {
        imgLinks.push(i['show']['image']['medium']);
    }
}

function addImagesToResult(imgLinks) {
    let resultDiv = document.getElementsByClassName('result')[0];

    for (let imglink of imgLinks)
        resultDiv.innerHTML += "<img src=\"" + imglink + "\" alt=\"result-image\" />";

    resultDiv.addEventListener('change', () => window.location.href = document.URL +  ' #resultdiv')
}

function listenToRadio() {
    let radios = document.getElementsByClassName("radio-button");
    for (let i = 0; i < radios.length; i++)
        radios[i].addEventListener("change", (event) => {
            document.body.style.backgroundColor = event.target.id;
            localStorage.setItem("bg-c", event.target.id);
        })
}

listenToRadio();
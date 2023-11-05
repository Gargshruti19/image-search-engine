const accessKey = "WCO1Nkc4C26M4kW-Oi6JOlTCYpPVQG1BTAkKrgN9tKM";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const searchBtn = document.querySelector("#srch");
let keyword = "";
let page = 91;
let perPage;

//Apply media query in javascript
let x = window.matchMedia("(max-width: 400px)");

function myFunction(x) {
	if (x.matches) {
		perPage = 6;
	} else {
		perPage = 12;
	}
}

x.addEventListener("change", myFunction);
myFunction(x);

async function searchImages() {
	keyword = searchBox.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${perPage}`;

	const response = await fetch(url);
	const data = await response.json();

	if (page === 1) {
		searchResult.innerHTML = "";
	}

	const results = data.results;

	results.map((result) => {
		const image = document.createElement("img");
		image.src = result.urls.small;

		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;

		imageLink.target = "_blank";

		imageLink.appendChild(image);
		searchResult.appendChild(imageLink);
	});

	showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", function (e) {
	e.preventDefault();
	page = 1;

	searchImages();
});

showMoreBtn.addEventListener("click", function () {
	page++;
	searchImages();
	
});

searchBtn.addEventListener("click", function () {
	searchImages();
});

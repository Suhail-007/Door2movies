let selectedMovie;

const app = {
movies: undefined,
//selectedMovie: undefined,
counter: 0,

init: function() {
	window.addEventListener('DOMContentLoaded', app.load);
	document.addEventListener('click', app.dropDown);
},

load: function() {
		app.getData();
},

getData: function() {
	 let id = document.body.id
		switch (id) {
		case 'home':
				app.getMovies('./', 'download/');
				app.findSearchMovie();
				app.pagination();
				app.movieElemCont().addEventListener('click', app.getElem);
				app.searchResultsCont().addEventListener('click', app.searchGoToDownload);
				break;
		case 'downloadPage':
		//Changing Path of image 	
				app.getMovies('../', '');		
				app.	searchResultsCont().addEventListener('click', app.searchGoToDownload);
				app.findSearchMovie();
				app.getSelectedMovie();
				break
		default:
				
  }
},

getMovies: function (path, downloadPath) {
		const movieCardTemplate = document.querySelector('.search-movie-template');
		
fetch('https://api.jsonbin.io/b/62690e4825069545a329e0fa/4').then(res => res.json()).then(data => {
app.movies	= 	data.map(movie => {
				//For Search bar
				const card = movieCardTemplate.content.cloneNode(true).children[0];
				const img = card.querySelector('[data-search-img]');
				const movieName = card.querySelector('[data-search-name]');
				img.src = `${path}${movie.img}`;
				movieName.textContent = movie.name	;
				movieName.href = `${downloadPath}download.html`;
				card.classList.add('hide');
				app.searchResultsCont().appendChild(card);		
				
				if (document.body.id === 'home') {
						//Home Page
						app.displayMovies(movie.name, movie.img);
				}		
				
				return {name: movie.name, img: movie.img, id: movie.id, element:card}
			})
});
},

movieElemCont: function () {
		const movieElem = document.querySelector('.movies-container');
		return movieElem
},

getElem: function(e) {
		const element = e.target.parentElement.closest('.movie-card');
		app.downloadMovie(element, 'p');
},	

pagination: function () {
		const paginationBtnsCont = document.querySelector('[data-pagination-Btncontainer]');
		paginationBtnsCont.addEventListener('click', app.nextPrevPage)
},

//Add movies in DOM
displayMovies: function (name,img) {
		app.movieElemCont().insertAdjacentHTML('afterbegin', `
			<div class="movie-card">
						<div class="movie-img">
							<img src="${img}" alt="${name}" />
						</div>
						<div class="movie-name-cont">
								<p class="movie-name"><a href="download/download.html">${name}</a></p>
						</div>
				</div>`);
},

//DropDown
dropDown: function (e) {
		const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

		//as long as user clicking inside of dropdown it won't close
		if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;
		
		const dropdownContent = document.querySelector('[data-dropdown-content]');
		
		if (isDropdownBtn) dropdownContent.classList.toggle('active');
	 else dropdownContent.classList.remove('active');
},

//Searchbar 
findSearchMovie: function () {
		const searchbar = document.querySelector('[data-search-bar]');
		const searchResultsCont = document.querySelector('[data-search-results]');

searchbar.addEventListener('input', (e) => {
		const inputValue = e.target.value.toLowerCase();
		if (inputValue !== '') searchResultsCont.classList.add('open');
		else app.searchResultsCont().classList.remove('open');		
		
		app.movies.forEach(movie => {
				const isIncludes = movie.name.toLowerCase().includes(inputValue);
				movie.element.classList.toggle('hide', !isIncludes);
		})		
});
},

searchResultsCont: function () {
		const searchCont = document.querySelector('[data-search-results]');
		return searchCont
},

searchGoToDownload: function (e) {
		const element = e.target.parentElement;
		app.downloadMovie(element, 'a')
},

//we'll increase the start variable by 10 everytime user click on next btn and then add 10 more to the end variable exmaple => slice(0, 10) then on next click => slice(10, 20);

//it's same for prevBtn we will just decrease the start by 10 and end by other 10 everytime user clicks

PAGE: function (start, end) {
		const page = app.movies.slice(start, end);
		let displayPage = app.movieElemCont();	
		displayPage.innerHTML = ''
		page.forEach(movie => app.displayMovies(movie.name, movie.img));
},

nextPrevPage: function (e) {
		const elem = e.target.dataset;
		
		const prevBtn = document.querySelector('[data-prevBtn]');
		const nextBtn = document.querySelector('[data-nextBtn]');
		
		if (elem.btn === 'Next') {
			//checking if we're on last page 	
				if (app.counter >= app.movies.length) {
					alert('You\'re on LAST PAGE');
						return
				}
				else {
						app.PAGE(app.counter, app.counter+1);
						app.counter = app.counter + 1;	
				}
		}
		else if(elem.btn === 'Prev') {
		//checking if we're on first page 	
			if (app.counter === 0 || app.counter === 1) {
					alert('You\'re on FIRST PAGE');
					return
			}
			else {
					app.counter = app.counter - 1;	
					app.PAGE(app.counter-1, app.counter);
			}			
		}
},

//filter the array and then dynamically add everything on download page
downloadMovie: function (element, qString) {
		if(element) {
		console.log(element.innerHTML);
		const movieName = element.querySelector(qString);
		selectedMovie = 	app.movies.filter(movie => {
		if (movieName.textContent === movie.name) return movie;
				});
				app.addToLocalStorage('movie', selectedMovie);
		}	 else return

},

getSelectedMovie: function () {
		const m = localStorage.getItem('movie');
		app.displayDownloadMovie(JSON.parse(m)[0].name, '_', JSON.parse(m)[0].img);	
},

displayDownloadMovie: function (name, link, img) {
		const mainSection = document.querySelector('main');
		const main = mainSection;
		main.innerHTML = `				<p>Home > ${name} </p>
				<section class="download-movie-page">
						<h2 class="DMV" data-download-movie-name>${name}</h2>
						<div class="img">
								<img src="../${img}" alt="${name}" />
						</div>
						<div class="download-movie">
								<p class="rating">Imbd Rating: 8/10</p>
								<p class="director">Director: <span>John Doe</span></p>
								<p class="actor">Actors: <span>John Doe, Jain Doe</span></p>
								<p class="descp">Description: <span>luptatum praesent nascetur tempus scripta ferri idque sonet omittam vitae tellus diam persius conceptam hac sed etiam semper habitasse interpretaris</span></p>
						</div>
				</section>
				<section class="links">
						<a href="#">${link}</a>
						<a href="#">${link}</a>
						<a href="#">${link}</a>
				</section>`
},

 //	LOCAL STORAGE
//add to localStorage
addToLocalStorage: function (item, value) {
		localStorage.setItem(item, JSON.stringify(value))
},

//Remove From localStorage
removeFromLocalStorage: function (item) {
		localStorage.removeItem(item);
},

}

app.init();


/*const myUrl = new URL(window.location.href);
const myu = new URLSearchParams(myUrl);

myu.set('name', 'suhail')
myu.set('id', '2')

console.log(myu.get('name'));
console.log(myu.get('id'));*/
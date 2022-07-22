const app = {
//Elems
movieElemCont: document.querySelector('.movies-container'),
searchCont: document.querySelector('[data-search-results]'),
paginationBtnsCont: document.querySelector('[data-pagination-Btncontainer]'),

//Variables
counter: 0,
movies: undefined,
selectedMovie: undefined,
fetchData: fetch('https://api.npoint.io/39747bbbd8c4e3aef9ff').then(res => res.json()),

//initialize
init: function() {
	window.addEventListener('DOMContentLoaded', this.load);
	document.addEventListener('click', this.dropDown);
},

//load everything
load: function() {
		app.getData();
},

//get data according to body
getData: function() {
	 let id = document.body.id
		switch (id) {
		case 'home':
				//Change Path for image and search Links on home page
				this.getMovies('./', 'download/');
				this.findSearchMovie();
				this.paginationBtnsCont.addEventListener('click', this.nextPrevPage.bind(this))
				break;
		case 'downloadPage':
				this.findSearchMovie();
				this.getSelectedMovie();
				//Change Path for image and search Links on download page 
				this.getMovies('../', '');
				break
		default:	
		return
  }
},

//fetch request
getMovies: async function (path, downloadPath) {
		try {
				const movieCardTemplate = document.querySelector('.search-movie-template');
				//waiting for fetch request 
				const response = await this.fetchData;
				this.movies	= 	response.map(movie => {
						//Home Page
						if (document.body.id === 'home') this.displayMovies(movie.name, movie.img, movie.id, 0, 0);
				
				//For Search bar
				const card = movieCardTemplate.content.cloneNode(true).children[0];
				
				this.fillSearch(card, movie.name, movie.img, movie.id, path, downloadPath);
				
				return {
				name: movie.name,
				img: movie.img,
				id: movie.id,
				element: card
				} 
		});
		} catch(err) {
				console.log(err);
				}
},

//fill up search bar
fillSearch: function (card, name, img, id, path, downPath) {
				const cardImg = card.querySelector('[data-search-img]');
				//anchor Elem
				const movieName = card.querySelector('[data-search-name]');
				cardImg.src = `${path}${img}`;
				movieName.textContent = name;
				//create Slug
				movieName.href = `${downPath}download.html?name=${this.createSlug(name)}&id=${id}`;
				card.classList.add('hide');
				this.searchCont.appendChild(card);					
},

//slug function 
createSlug: function (str) {
		return str.toLowerCase();
},

//Add movies in DOM
displayMovies: function (name,img, id, start, end) {
		this.movieElemCont.insertAdjacentHTML('afterbegin', `
			<div class="movie-card">
						<div class="movie-img">
							<img src="${img}" alt="${name}" />
						</div>
						<div class="movie-name-cont movie-link">
							<a class="movie-name" href="download/download.html?name=${this.createSlug(name)}&id=${id}&start=${start}end=${end}">${name}</a>
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

searchbar.addEventListener('input', (e) => {
		const inputValue = e.target.value.toLowerCase();
		if (inputValue !== '') this.searchCont.classList.add('open');
		else this.searchCont.classList.remove('open');		
		
		this.movies.forEach(movie => {
				const isIncludes = movie.name.toLowerCase().includes(inputValue);
				movie.element.classList.toggle('hide', !isIncludes);
		})		
});
},

nextPrevPage: function (e) {
		const elem = e.target.dataset;
		
		const prevBtn = document.querySelector('[data-prevBtn]');
		const nextBtn = document.querySelector('[data-nextBtn]');
		
		if (elem.btn === 'Next') {
			//checking if we're on last page 	
				if (this.counter >= this.movies.length) {
					alert('You\'re on LAST PAGE');
					return
				}
				else {
						app.PAGE(this.counter, this.counter+1);
						this.counter = this.counter + 1;
				}
		}
		else if(elem.btn === 'Prev') {
		//checking if we're on first page 	
			if (this.counter === 0 || this.counter === 1) {
					alert('You\'re on FIRST PAGE');
					return
			}
			else {
					this.counter = this.counter - 1;	
					app.PAGE(this.counter-1, this.counter);
			}			
		}
},

//we'll increase the start variable by 10 everytime user click on next btn and then add 10 more to the end variable exmaple => slice(0, 10) then on next click => slice(10, 20);

//it's same for prevBtn we will just decrease the start by 10 and end by other 10 everytime user clicks

PAGE: function (start, end) {
		const page = this.movies.slice(start, end);
		let displayPage = this.movieElemCont;	
		displayPage.innerHTML = ''
		page.forEach(movie => this.displayMovies(movie.name, movie.img, movie.id, start, end));
		
		//add Page number when using pagination
		const url = new URL(window.location.href);
		url.searchParams.set("start", start);
		url.searchParams.set("end", end);		 
},

getSelectedMovie: async function (e) {
		try {
				//fetch request
				const response = await this.fetchData;
				//get Movie id from window url		
				const url = new URL(window.location.href);
				const movieId = url.searchParams.get('id');
				const movieName = url.searchParams.get('name');
				
				//checking if both name and id exist in url xD
				if(movieId && movieName) {
						selectedMovie = response.filter(movie => {
						if (Number(movieId) === Number(movie.id)) return movie;
					});
						const movie = await selectedMovie[0];
							//display download Movie
						this.displayDownloadMovie(movie.name, movie.link, movie.img);
				}
		} catch(err) {
				console.log(err);
		}
},

//show selected movie
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

checkName: function () {
  const pageUrl = 
},

}

app.init();

//create three functions one download page when received a url, will show a movie according to that
//one which will check if user is using pagination or not and show movies according to on which page user is and update the counter variable according to that
//a function which will check if it's a download page url or pagination 

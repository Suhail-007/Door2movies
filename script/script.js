const app = {
  //Elems
  movieElemCont: document.querySelector('.movies-container'),
  searchCont: document.querySelector('[data-search-results]'),
  paginationBtnsCont: document.querySelector('[data-pagination-Btncontainer]'),
  movieCardTemplate: document.querySelector('.search-movie-template'),
  //Variables
  counter: 9,
  movies: undefined,
  selectedMovie: undefined,
  fetchData: fetch('https://api.npoint.io/39747bbbd8c4e3aef9ff').then(res => res.json()),

  //initialize
  _init: function() {
    window.addEventListener('DOMContentLoaded', () => {
      this._load();
      this.checkPage();
    });
    document.addEventListener('click', app._dropDown);
  },

  _load: function() {
    app._getData();
  },

  //get data according to body
  _getData: function() {
    let id = document.body.id
    switch (id) {
      case 'home':
        //Change Path for image and search Links on home page
        this._getMovies('./', 'download/');
        this.findSearchMovie();
        this.paginationBtnsCont.addEventListener('click', this.nextPrevPage.bind(this));
        break;
      case 'downloadPage':
        this.findSearchMovie();
        this._getSelectedMovie();
        //Change Path for image and search Links on download page 
        this._getMovies('../', '');
        break;
      case 'page':
        this._getMovies('../', '../download/');
        this.findSearchMovie();
        this.paginationBtnsCont.addEventListener('click', this.nextPrevPage.bind(this));
        this._getSelectedMovie();
        //    this.checkPage()
      default:
        return
    }
  },

  //fetch request
  _getMovies: async function(path, downloadPath) {
    try {
      //		const movieCardTemplate = document.querySelector('.search-movie-template');
      //waiting for fetch request 
      const response = await this.fetchData;
      this.movies = await response.map(movie => {
        //Home Page
        if (document.body.id === 'home') this._displayMovies(movie.name, movie.img, './', movie.id, '_', '_');

        //For Search bar
        //				const card = movieCardTemplate.content.cloneNode(true).children[0];
        const card = this.movieCardTemplate.content.cloneNode(true).children[0];

        this._fillSearch(card, movie.name, movie.img, movie.id, path, downloadPath);

        return {
          name: movie.name,
          img: movie.img,
          id: movie.id,
          element: card
        }
      });
    } catch (err) {
      location.reload();
      console.log(err);
    }
  },

  //fill up search container
  _fillSearch: function(card, name, img, id, path, downPath) {
    const cardImg = card.querySelector('[data-search-img]');
    //anchor Elem
    const movieName = card.querySelector('[data-search-name]');
    cardImg.src = `${path}${img}`;
    movieName.textContent = name;
    //create Slug
    movieName.href = `${downPath}download.html?name=${this._createSlug(name)}&id=${id}`;
    card.classList.add('hide');
    this.searchCont.appendChild(card);
  },

  //slug function 
  _createSlug: function(str) {
    return str.toLowerCase();
  },

  //Add movies in DOM
  _displayMovies: function(name, img, imgPath, id, start, end) {
    this.movieElemCont.insertAdjacentHTML('afterbegin', `
			<div class="movie-card">
						<div class="movie-img">
							<img src="${imgPath}${img}" alt="${name}" />
						</div>
						<div class="movie-name-cont movie-link">
							<a class="movie-name" href="download/download.html?name=${this._createSlug(name)}&id=${id}&start=${start}end=${end}">${name}</a>
						</div>
				</div>`);
  },

  //DropDown
  _dropDown: function(e) {
    const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

    //as long as user clicking inside of dropdown it won't close
    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;

    const dropdownContent = document.querySelector('[data-dropdown-content]');

    if (isDropdownBtn) dropdownContent.classList.toggle('active');
    else dropdownContent.classList.remove('active');
  },

  //Searchbar 
  findSearchMovie: function() {
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

  //we start counting from last array item so that whenever new movie is added it shows on first on next page
  nextPrevPage: function(e) {
    const elem = e.target.dataset;

    const prevBtn = document.querySelector('[data-prevBtn]');
    const nextBtn = document.querySelector('[data-nextBtn]');

    if (elem.btn === 'Next') {
      //		checking if we're on last page 

      if (this.counter === 0) return alert('You\'re on LAST PAGE');
      else {

        this.PAGE(this.counter - 1, this.counter);
        this.counter = this.counter - 1;
      }
    }
    else if (elem.btn === 'Prev') {
      //checking if we're on first page 	
      if (this.counter >= this.movies.length - 1) return alert('You\'re on FIRST PAGE');
      else {
        this.counter = this.counter + 1;
        this.PAGE(this.counter, this.counter + 1);
      }
    }


    /*	if (elem.btn === 'Next') {
    		//		checking if we're on last page 
    					if (this.counter >= this.movies.length) {
    					alert('You\'re on LAST PAGE');
    					return
    				}
    				else {
    						this.PAGE(this.counter, this.counter +1 );
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
    					this.PAGE(this.counter-1, this.counter);
    			}			
    		}*/
  },
  
    //we'll increase the start variable by 10 everytime user click on next btn and then add 10 more to the end variable exmaple => slice(0, 10) then on next click => slice(10, 20);

  //it's same for prevBtn we will just decrease the start by 10 and end by other 10 everytime user clicks

  PAGE: function(start, end) {
    const page = this.movies.slice(start, end);
    let displayPage = this.movieElemCont;
    displayPage.innerHTML = '';
    page.forEach(movie => {
      this._displayMovies(movie.name, movie.img, '../', movie.id, start, end);
    });
    
    //window.location.replace(`page.html?start=${start}&end=${end}`);
//add Page number when using pagination
//const url = new URL(u);
//console.log(u);
/*url.searchParams.set("start", start);
url.searchParams.set("end", end);*/
  },

  
  _getSelectedMovie: async function(e) {
    try {
      //get Movie id from window url		
      const url = new URL(window.location.href);
      console.log(url);
      const movieId = url.searchParams.get('id');
      const movieName = url.searchParams.get('name');
      //fetch request
      const response = await this.fetchData;
      //checking if both name and id exist in url xD
      if (movieId && movieName) {
        selectedMovie = response.filter(movie => {
          if (Number(movieId) === Number(movie.id)) return movie;
        });
        const movie = await selectedMovie[0];
        //display download Movie
        this._displayDownloadMovie(movie.name, movie.link, movie.img);
      }
    } catch (err) {
      console.log(err);
    }
  },

  //show selected movie
  _displayDownloadMovie: function(name, link, img) {

    const mainSection = document.querySelector('main');
    const main = mainSection;
    main.innerHTML = `				<p> Home > ${name} </p>
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

  checkPage: async function() {
    try {
      const pageUrl = new URL(window.location.href);
      const start = pageUrl.searchParams.get("start");
      if (pageUrl.toString().includes("start") && start > 0) {
        const end = pageUrl.searchParams.get('end');
        const movies = await this.fetchData;
        const slicedArr = movies.slice(start, end);
        let displayPage = this.movieElemCont;
        displayPage.innerHTML = ''
        slicedArr.map(movie => {
          this._displayMovies(movie.name, movie.img, '../', movie.id, start, end);
          //     		console.log(this._displayMovies(movie.name, movie.img, movie.id, '../', start, end);
        })
      }
    } catch (err) {
      console.log(err);
    }
  },
}

app._init();

//change the start and end in url of page
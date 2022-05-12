const movieCardTemplate = document.querySelector('.search-movie-template');
const movieElemCont = document.querySelector('.movies-container');
const searchResultsCont = document.querySelector('[data-search-results]');

let movies = [];

fetch('https://api.jsonbin.io/b/62690e4825069545a329e0fa/4').then(res => res.json()).then(data => {
movies	= 	data.map(movie => {
				//For Search bar
				const card = movieCardTemplate.content.cloneNode(true).children[0];
				const img = card.querySelector('[data-search-img]');
				const movieName = card.querySelector('[data-search-name]');
				img.src = movie.img;
				movieName.textContent = movie.name	;	
				card.style.display = 'none';
				searchResultsCont.appendChild(card);		
				//Home Page
				displayMovies(movie.name, movie.img)
				return {name: movie.name, img: movie.img, id: movie.id, element:card}
			})
})

//Add movies in DOM
const displayMovies = function (name,img) {
		movieElemCont.insertAdjacentHTML('beforeend', `
			<div class="movie-card">
						<div class="movie-img">
							<img src="${img}" alt="${name}" />
						</div>
						<div>
								<p class="movie-name"><a href="#">${name}</a></p>
						</div>
				</div>`);
}

//DropDown
document.addEventListener('click', function (e) {
		const isDropdownBtn = e.target.matches('[data-dropdownBtn]');

		//as long as user clicking inside of dropdown it won't close
		if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;
		
		const dropdownContent = document.querySelector('[data-dropdown-content]')
		
		if (isDropdownBtn) dropdownContent.classList.toggle('active');
	 else dropdownContent.classList.remove('active');
});

//Searchbar 
const searchbar = document.querySelector('[data-search-bar]');

searchbar.addEventListener('input', (e) => {
		const inputValue = e.target.value.toLowerCase();
		
		movies.forEach(movie => {
				const isIncludes = movie.name.toLowerCase().includes(inputValue);

				if (isIncludes) {
						searchResultsCont.classList.add('open');
						movie.element.style.display = 'block'			
				} else movie.element.style.display = 'none';
				
				if (inputValue === '') searchResultsCont.classList.remove('open');
		})
});

/*next i have to make download page to do that
1. I'll loop over the movies array and filter that array using just like we did with search functionality..
2. loop over movies array then checks if e.target(movie name) includes in movie array
3.if it does show that movie to download page
4. have to add link in the movies array yet */
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
				card.classList.add('hide');
				searchResultsCont.appendChild(card);		
				
				//Home Page
				displayMovies(movie.name, movie.img)
				return {name: movie.name, img: movie.img, id: movie.id, element:card}
			})
})

//Add movies in DOM
const displayMovies = function (name,img) {
		movieElemCont.insertAdjacentHTML('afterbegin', `
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
		if (inputValue !== '') searchResultsCont.classList.add('open');
		else searchResultsCont.classList.remove('open');		
		
		movies.forEach(movie => {
				const isIncludes = movie.name.toLowerCase().includes(inputValue);
				movie.element.classList.toggle('hide', !isIncludes);
		})		
});



/*next i have to make a download page to do that
1. I'll loop over the movies array and filter that array using just like we did with search functionality..
2. loop over movies array then checks if e.target(movie name) includes in movie array
3.if it does show that movie to download page
4. have to add link in the movies array yet */


const paginationCont = document.querySelector('[data-pagination-container]');

let counter = 0;

//we'll increase the start variable by 10 everytime user click on next btn and then add 10 more to the end variable exmaple => slice(0, 10) then on next click => slice(10, 20);

//it's same for prevBtn we will just decrease the start by 10 and end by other 10 everytime user clicks

const nextPrevMovies = function (start, end) {
		const page1 = movies.slice(start, end);
		movieElemCont.innerHTML = '';	
		page1.forEach(movie => displayMovies(movie.name, movie.img));
}

paginationCont.addEventListener('click', function (e) {
		const elem = e.target;
		console.log(elem);
		const prevBtn = document.querySelector('[data-prevBtn]');
		const nextBtn = document.querySelector('[data-nextBtn]');
		
		if (elem.innerHTML === 'Next') {
			//checking if we're on last page 	
				if (counter >= movies.length) {
					alert('THIS IS THE LAST PAGE');
						return
				}
				else {
						nextPrevMovies(counter, counter+4);
						counter = counter + 4;	
				}
		}
		else {
		//checking if we're on first page 	
			if (counter === 0 || counter === 4) {
					alert('THIS IS THE FIRST PAGE');
					return
			}
			else {
				counter = counter - 4;	
				nextPrevMovies(counter-4, counter);
			}
		}
})	

// what i have to do next is select the next and prev button and increase and decrease the counter according to it plus if counter is zero hide the prev button and when counter is equal to movies length hide next button 

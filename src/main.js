const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },

});


// Utils


function slidesshow(tvs, principales){
  principales.innerHTML = '',
  tvs.forEach(tv => {
  const principal = document.createElement('div');
  principal.classList.add('movie-container1');
  principal.classList.add('movie-container');
  
 principal.addEventListener('click', () => {
  location.hash = '#tv=' + tv.id;
});

   const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', tv.title);
      movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + tv.poster_path,
    ); 
    
 // principal.classList.add('click', 'currentSlide',(n)=> {
  principal.appendChild(movieImg);
   principales.appendChild(principal)

  })
 
}




function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash = '#movie=' + movie.id;
    });

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createtvCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-containertv');

    const categoryTitle = document.createElement('botton');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id',  + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}



function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('botton');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id',  + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamados a la API

async function getslidesshow() {
  const { data } = await api('/tv/popular');
  const tv = data.results;
  console.log(tv)
  

  slidesshow(tv, moviePrincipal);
}


async function getTrendingMoviesPreview() {
  const { data } = await api('/movie/popular');
  const movies = data.results;
  console.log(movies)

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategegoriestvPreview() {
  const { data } = await api('genre/tv/list');
  const categories = data.genres;

  createtvCategories(categories, categoriesPreviewtvList)  ;
}

async function getCategegoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList)  ;
}

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function gettvByCategory(id) {
  const { data } = await api('discover/tv', {
    params: {
      with_genres: id,
    },
  });
  const tv = data.results;

  createMovies(tv, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api(`/search/multi`,{
    params: {
      query,
    },
  });
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api('movie/' + id);
  
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  console.log(movieImgUrl)
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 19.27%,
      rgba(0, 0, 0, 0.5) 29.17%
    ),
    url(${movieImgUrl})
  `;
  
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;


  
  createCategories(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesId(id);
}

async function gettvById(id){
  const { data: tv } = await api('tv/' + id);
  
  const tvImgUrl = 'https://image.tmdb.org/t/p/w500' + tv.poster_path;
  console.log(tvImgUrl)
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 19.27%,
      rgba(0, 0, 0, 0.5) 29.17%
    ),
    url(${tvImgUrl})
  `;
  
  movieDetailTitle.textContent = tv.title;
  movieDetailDescription.textContent = tv.overview;
  movieDetailScore.textContent = tv.vote_average;


  
  createtvCategories(tv.genres, movieDetailCategoriesList);
  getRelatedtvId(id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}
  async function getRelatedtvId(id) {
    const { data } = await api(`tv/${id}/recommendations`);
    const relatedtv = data.results;
  
    slidesshow(relatedtv, relatedMoviesContainer);
  }


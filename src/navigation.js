searchFormBtn.addEventListener('click', () => {
  location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  history.back();
  // location.hash = '#home';
});
Home.addEventListener('click', () => {
  
   location.hash = '#home';
});


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  }
    else if (location.hash.startsWith('#tv=')) {
      tvDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  console.log('Home!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  sectionslider.classList.remove('inactive');
  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  categoriesPreviewtvSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  moviePrincipal.classList.remove('inactive');
  
  getTrendingMoviesPreview();
  getCategegoriesPreview();
  getCategegoriestvPreview();
  getslidesshow();
}

function categoriesPage() {
  console.log('categories!!');
  
 
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.remove('inactive');
  sectionslider.classList.add('inactive');
  moviePrincipal.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  categoriesPreviewtvSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  head.classList.remove('inactive');

  // ['#category', 'id-name']
  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = categoryName;
  gettvByCategory(categoryId);
  getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  categoriesPreviewtvSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  moviePrincipal.classList.add('inactive');
  relatedMoviesContainer.classList.add('relatedMoviest-scrollContainer');
 
  // ['#movie', '234567']
  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);

}

function tvDetailsPage() {
  console.log('Movie!!');

  headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  categoriesPreviewtvSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  moviePrincipal.classList.add('inactive');
  relatedMoviesContainer.classList.add('relatedMoviest-scrollContainer');
  
  // ['#movie', '234567']
  const [_, tvId] = location.hash.split('=');
  gettvById(tvId);
}

function searchPage() {
  console.log('Search!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  moviePrincipal.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  categoriesPreviewtvSection.classList.add('inactive');
  sectionslider.classList.add('inactive');

  // ['#search', 'platzi']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
}

function trendsPage() {
  console.log('TRENDS!!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.remove('inactive');
  moviePrincipal.classList.add('inactive');
  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';

  getTrendingMovies();
}



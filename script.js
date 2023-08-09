const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async function(){
    const inputKeyWord = document.querySelector('.input-keyword').value
    const movies = await getMovies(inputKeyWord)
    updateUI(movies)

})

const inputKeyWord = document.querySelector('.input-keyword')
inputKeyWord.addEventListener('keypress', async function(event){
    if (event.key === 'Enter'){
        const movies = await getMovies(inputKeyWord.value)
        updateUI(movies)
    }
})

document.addEventListener('click', async function(event){
   if ( event.target.classList.contains('modal-detail-button')){
        const imdbid = event.target.dataset.imdbid
        const movieDetail = await getMovieDetail(imdbid)
        updateMovieDetail(movieDetail)
   }
})


// fungsi-fungsi
function getMovies(keyword){
    return  fetch(`https://www.omdbapi.com/?apikey=27977494&s=${keyword}`)
    .then(response => response.json())
    .then(result => {
        if (result.Error === 'Movie not found!'){
            return `<div class="ms-1 pesan">
                      <h1 class="opacity-75">"${keyword}" tidak dapat ditemukan</h1>
                      </div>`
        }else if(!keyword) {
            return `<div class="ms-1 pesan">
                      <h1 class="opacity-75">Anda belum memasukkan keyword</h1>
                      </div>`
        }else {
            return result.Search
        }
    })        
}

function getMovieDetail(imdbid){
    return fetch(`https://www.omdbapi.com/?apikey=27977494&i=${imdbid}`)
    .then(response => response.json())
    .then(result => result)
}

function updateUI(movies){
    let cards = ''
    if (typeof(movies) === 'object'){
        movies.forEach(m => cards += showCard(m))
    }else {
        cards = movies
    }
    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = cards
}

function updateMovieDetail(movieDetail) {
    const modalMovieDetail = showMovieDetail(movieDetail)
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = modalMovieDetail
}



function showCard(m){
    return   `<div class="col-md-4 my-3" >
                    <div class="card" style="height: 100%" >
                        <img src="${m.Poster}" class="card-img-top object-fit-fill">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <p class="card-text text-muted">${m.Year}</p>
                            <a href="#" class="btn btn-secondary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid=${m.imdbID}>Show details</a>
                        </div>
                    </div>
                </div>`
            }
            
function showMovieDetail(m){
return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                        <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                        <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                        <li class="list-group-item"><strong>Plot :</strong> <br>${m.Plot}</li>
                    </ul>
                </div>
            </div>
        </div>`
}



// fitur-fitur tambahan

// fitur darkmode dan menyimpan informasi darkmode user
const Toggler = $('#toggle');
const html = $('html')

function saveThemeToLocalStorage() {
    const themeValue = html.attr('data-bs-theme');
    localStorage.setItem('theme', themeValue);
  }
  function setThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem('theme');
    html.attr('data-bs-theme', savedTheme);
}

setThemeFromLocalStorage()

Toggler.change(function(){
    if(Toggler.prop('checked') == true){
        html.attr('data-bs-theme', 'dark')
        saveThemeToLocalStorage()
    }else{
        html.attr('data-bs-theme', '')
        saveThemeToLocalStorage()
    }
});



// Fungsi untuk mengatur status toggle saat halaman dimuat
function setToggleStatus() {
    const toggle = document.getElementById('toggle');
    // Ganti 'namaAtribut' dengan nama atribut yang Anda gunakan (misalnya 'data-bs-theme')
    const toggleStatus = localStorage.getItem('theme') === 'dark';
    
    toggle.checked = toggleStatus;
}

// Panggil fungsi untuk mengatur status toggle saat halaman dimuat
document.addEventListener('DOMContentLoaded', setToggleStatus); // dari ChatGPT
// setToggleStatus()

 

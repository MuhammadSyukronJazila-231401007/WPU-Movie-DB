// tes gk sih
$('.search-button').on('click', function(){
    inputHandler()
})

$('.input-keyword').on('keypress', function(event){
    if (event.key === 'Enter'){
        inputHandler()
    }
})


function inputHandler(){
    $.ajax({
        url:`https://www.omdbapi.com/?apikey=27977494&s=${$('.input-keyword').val()}`,
        success:result => {
            const movies = result.Search
            let cards = ''
            if (movies){
                movies.forEach(m => {
                cards += showCard(m)
                });
            }else {
                cards = `<div class="ms-1 pesan">
                            <h1 class="opacity-75">"${$('.input-keyword').val()}" tidak dapat ditemukan</h1>
                        </div>`
            }
        $('.movie-container').html(cards)
    
        //ketika tombol detail diklil
        $('.modal-detail-button').on('click', function(){
            $.ajax({
                url:`https://www.omdbapi.com/?apikey=27977494&i=${$(this).data('imdbid')}`,
                success:m => {
                    const movieDetail = showMovieDetail(m)

                    $('.modal-body').html(movieDetail)
                },
                error: (e) => {
                    console.log(e.responseText)
                }
            })
            
        })
        },
        error: (e) => {
            console.log(e.responseText)
        }
    }) 
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
  // dari ChatGPT -> document.addEventListener('DOMContentLoaded', setToggleStatus);
setToggleStatus()
 

"use strict";
const header =document.querySelector("header");
const sliderContent = document.querySelectorAll('.slider-content')
const sliders= document.querySelectorAll(".slide");
const LeftBtn= document.getElementById('left');
const RightBtn= document.getElementById('right');
const MenuBar=document.querySelector('.Menu-bar');

const Form = document.getElementById('Form')
const Search = document.getElementById('Search');
const MoviesDetails= document.querySelector('.movies-details');


const Peg= document.querySelectorAll('.peg ul li');

//Tv shows Seclector

const TvShowsDetails= document.querySelector('.tv-details');





const MoviesApi="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1fe8f7f7b46939ae9032cc9f1665154f&page=";

const ImgPath="https://image.tmdb.org/t/p/w1280";

const SearchURl="https://api.themoviedb.org/3/search/movie?api_key=1fe8f7f7b46939ae9032cc9f1665154f&query=";

const TvShowAPI = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=1fe8f7f7b46939ae9032cc9f1665154f&page=";

const SearchURlTv="https://api.themoviedb.org/3/search/tv?api_key=1fe8f7f7b46939ae9032cc9f1665154f&query=";

GetMivies(MoviesApi);

// Movies Function

async function GetMivies(Url){
    try{
        const Response = await fetch(Url);
        const Data = await Response.json();
        MOviesShows(Data.results);
        console.log(Data);

    }catch (error){}
}

// Display Movies

function MOviesShows(movi){
    MoviesDetails.innerHTML="";
    movi.forEach((movie) => {
        //console.log(movie);


         const {title, poster_path ,vote_average, release_date}= movie;
        const MoviDisplay= document.createElement('div');
        MoviDisplay.classList.add("movies");
        MoviDisplay.innerHTML=`<img src="${ImgPath + poster_path}" alt="" />
        <p class="Movies-title">${title}</p>
        <div class="short-detail">
            <p class="year">Date: ${release_date}</p>
            <p class="rating">Rating: ${vote_average}</p>
            </div>`;
            MoviesDetails.appendChild(MoviDisplay);
         
    });

}

//Tv Shows fintion section

GetTvShows(TvShowAPI);

// Tv show Function

async function GetTvShows(Url){
    try{
        const Response = await fetch(Url);
        const Data = await Response.json();
        showTvshows(Data.results);
        console.log(Data);

    }catch (error){}
}

function showTvshows(tvshow){
    TvShowsDetails.innerHTML="";
    tvshow.forEach((tv) => {
        //console.log(movie);


        const { name, poster_path, vote_average, first_air_date}= tv;
        const tvshowiDisplay= document.createElement('div');
        tvshowiDisplay.classList.add("tvshow");
        tvshowiDisplay.innerHTML=`<img src="${ImgPath + poster_path}" alt="" />
        <p class="tvshow-title">${name}</p>
        <div class="short-detail">
            <p class="year">Date: ${first_air_date}</p>
            <p class="rating">Rating: ${vote_average}</p>
            </div>`;
            TvShowsDetails.appendChild(tvshowiDisplay);
         
    });


}

// Search Section

Form.addEventListener("submit",(ev)=>{
    ev.preventDefault();
    const SearchValue = Search.value;
    //console.log(SearchValue);
    if(SearchValue && SearchValue !==""){
        GetMivies(SearchURl + SearchValue);
        GetTvShows(SearchURlTv + SearchValue);
        SearchValue.value="";
    }else{
        window.location.reload();
    }
})





window.addEventListener('scroll', () =>{
    if(document.documentElement.scrollTop > 20){
        MenuBar.classList.add('sticker');


    }else{
        MenuBar.classList.remove('sticker');
    }
})


let activeSlide = 0;

function SetBgBody(){
    header.style.backgroundImage = sliders[activeSlide].style.backgroundImage;



}
SetBgBody();

function SetActiveSlide(){
    sliders.forEach((slides) => 
        slides.classList.remove("active"));
        sliders[activeSlide].classList.add("active");
        
    
}

function SetContent(){
    sliderContent.forEach((sliderContents) =>{
        sliderContents.classList.remove("active");

    });
    sliderContent[activeSlide].classList.add("active");
    //console.log(sliderContent)

}

RightBtn.addEventListener('click',() =>{
    activeSlide++;
    if(activeSlide > sliders .length - 1){
        activeSlide = 0;
    }
    nextSlide()
    SetBgBody();
    SetActiveSlide();
    SetContent()
})
LeftBtn.addEventListener('click',() =>{
    activeSlide--;
    if(activeSlide < 0 ){
        activeSlide = sliders.length -1;
    }
    
    PreviousSlide();
    SetBgBody();
    SetActiveSlide();
    SetContent();
})

function nextSlide(){
    activeSlide++;
    if(activeSlide > sliders.length -1){
        activeSlide=0;
    }
}

function PreviousSlide(){
    activeSlide--;
    if(activeSlide < 0){
        activeSlide = sliders.length -1;
    }


}

setInterval(() => {
    nextSlide();
    SetBgBody();
    SetActiveSlide();
    SetContent();

},7000);

// peg JS

Peg.forEach((pages,index) => {
    pages.addEventListener('click', () => {
        if(GetMivies){
            GetMivies(MoviesApi+index);
        }
        GetTvShows(TvShowAPI + index);
    
    });
    
});







 


 
let searchForm=document.querySelector("form");
let movieContainer=document.querySelector(".movie-container");
let inputBox=document.querySelector(".input-Box");

//function to fetch movie details using OMDB API
const getMovieInfo= async (movie) =>{
    try{
const myApiKey="2d07f40d";
const url=`https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
const response= await fetch(url);
if(!response.ok){
    throw new Error("Unable to fetch movie data");
}
const data= await response.json();

showMovieData(data);
}catch(error){
    showErrorMessage("No Movie Found");
}
}
//Function to show movie data on screen
let showMovieData=(data)=>{
    movieContainer.innerHTML="";
    movieContainer.classList.remove("noBackGround");
    //Use Destructing assignment to extract properties from data object
const{Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

const movieElement=document.createElement('div');
movieElement.classList.add("movie-info");
movieElement.innerHTML=`<h2>${Title}</h2>
                       <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`

 const movieGenreElement=document.createElement('div');
 movieGenreElement.classList.add("movie-genre");  

Genre.split(",").forEach(element=>{
const p=document.createElement("p");
p.innerText=element;
movieGenreElement.appendChild(p);
});

movieElement.appendChild(movieGenreElement);
movieElement.innerHTML +=`<p><strong> Released:</strong>${Released}</p>
                        <p><strong> Duration:</strong>${Runtime}</p>
                        <p><strong> Cast:</strong>${Actors}</p>
                        <p><strong> Plot:</strong>${Plot}</p>`

//Creating a div for movie poster 
let moviePosterElement=document.createElement('div');
moviePosterElement.classList.add("movie-poster");    
moviePosterElement.innerHTML=`<img src="${Poster}"/>`;
movieContainer.appendChild(moviePosterElement); 
movieContainer.appendChild(movieElement)
}


//Function to display  error message
const showErrorMessage=(message)=>{
 movieContainer.innerHTML=`<h2>${message}</h2>`
        movieContainer.classList.add("noBackGround");
}


//  Function to handle form submisssion
const handleFormSubmission=(e)=>{
e.preventDefault();
    let movieName=inputBox.value.trim();
    if(movieName!==''){
        showErrorMessage("Fetching Movie information...")
        getMovieInfo(movieName);
    }
    else
    {
        showErrorMessage("Enter movie name to get movie information");
    }
}

//Adding event listner to search form
searchForm.addEventListener('submit', handleFormSubmission)
    



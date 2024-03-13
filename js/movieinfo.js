"use strict";

(function () {
  const title = document.getElementById("title");
  const year = document.getElementById("year");
  const runtime = document.getElementById("runtime");
  const rating = document.getElementById("rating");
  const poster = document.getElementById("poster");
  const plot = document.getElementById("plot");
  const directorsName = document.getElementById("director-names");
  const castName = document.getElementById("cast-names");
  const genre = document.getElementById("genre");

  // Retrieve movie name from localStorage
  const movieName = localStorage.getItem("movieName");

  if (movieName) {
    fetchMovies(movieName);
  } else {
    console.error("Movie name not found in localStorage.");
  }

  async function fetchMovies(search) {
    const url = `https://www.omdbapi.com/?t=${search}&type=movie&apikey=d19cd846`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();

      // Update DOM with movie details
      year.textContent = data.Year;
      runtime.textContent = data.Runtime;
      rating.textContent = `${data.imdbRating}/10`;
      poster.setAttribute("src", data.Poster);
      plot.textContent = data.Plot;
      directorsName.textContent = data.Director;
      castName.textContent = data.Actors;
      genre.textContent = data.Genre;
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
    }
  }
})();

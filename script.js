// 1. Esperamos a que la página esté lista
document.addEventListener("DOMContentLoaded", function () {
    // 2. Seleccionamos los elementos que necesitamos
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultsDiv = document.getElementById("results");
  
    // 3. Cuando el usuario hace clic en el botón "Buscar"
    searchButton.addEventListener("click", function () {
      // 4. Obtenemos el nombre de la película que escribió el usuario
      const movieName = searchInput.value;
  
      // 5. Si el usuario no escribió nada, le decimos que escriba algo
      if (movieName === "") {
        alert("¡Escribe el nombre de una película!");
        return;
      }
  
      // 6. Llamamos a la API para buscar la película
      fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=9152b8d5`)
        .then((response) => response.json())
        .then((data) => {
          // 7. Limpiamos los resultados anteriores
          resultsDiv.innerHTML = "";
  
          // 8. Si la API no encuentra películas, mostramos un mensaje
          if (data.Response === "False") {
            resultsDiv.innerHTML = "<p>No se encontraron películas 😢</p>";
            return;
          }
  
          // 9. Mostramos las películas que encontramos
          data.Search.forEach((movie) => {
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
              <h2>${movie.Title}</h2>
              <p>Año: ${movie.Year}</p>
              <p>Tipo: ${movie.Type}</p>
              <img src="${movie.Poster}" alt="${movie.Title}">
            `;
            resultsDiv.appendChild(movieElement);
          });
        })
        .catch((error) => {
          console.error("Error al buscar películas:", error);
        });
    });
  });
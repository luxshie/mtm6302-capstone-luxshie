const apodForm = document.getElementById("apodForm");
const dateInput = document.getElementById("date");
const apodContainer = document.getElementById("apodContainer");
const favoriteButton = document.getElementById("favoriteButton");
const favoritesContainer = document.getElementById("favorites-container");

// Initialize an empty favorites array
let favorites = [];

apodForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selectedDate = dateInput.value;
  // Make an API request using the selected date
  const apodData = await fetchAPOD(selectedDate);
  // Display the APOD data on the page
  displayAPOD(apodData);
  // Update the "Favorite" button
  updateFavoriteButton(apodData);
});

favoriteButton.addEventListener("click", () => {
  const selectedDate = dateInput.value;
  toggleFavorite(selectedDate);
});

function fetchAPOD(date) {
  const apiKey = "Gn2fSluExTEo1TgglbcAkiSDlWQ8X6DgeV7txEh8";
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => console.error("Error fetching APOD data: ", error));
}

function displayAPOD(apodData) {
  const imageElement = document.createElement("img");
  imageElement.src = apodData.url;
  imageElement.alt = apodData.title;
  imageElement.classList.add("apod-image"); // Add the class to the image
  imageElement.addEventListener("click", () => {
    window.open(apodData.hdurl, "_blank");
  });

  const titleElement = document.createElement("h2");
  titleElement.textContent = apodData.title;

  const dateElement = document.createElement("p");
  dateElement.textContent = apodData.date;

  const explanationElement = document.createElement("p");
  explanationElement.textContent = apodData.explanation;

  apodContainer.innerHTML = "";
  apodContainer.appendChild(imageElement);
  apodContainer.appendChild(titleElement);
  apodContainer.appendChild(dateElement);
  apodContainer.appendChild(explanationElement);
}

function updateFavoriteButton(apodData) {
  const isFavorite = favorites.some((favorite) => favorite.date === apodData.date);
  if (isFavorite) {
    favoriteButton.textContent = "Unfavorite";
  } else {
    favoriteButton.textContent = "Favorite";
  }
}

async function toggleFavorite(date) {
  const isFavorite = favorites.some((favorite) => favorite.date === date);
  if (!isFavorite) {
    const apodData = await fetchAPOD(date);
    favorites.push({ date, data: apodData });
  } else {
    favorites = favorites.filter((favorite) => favorite.date !== date);
  }
  updateFavoriteButton({ date });
  displayFavorites();
}

function displayFavorites() {
  favoritesContainer.innerHTML = "";
  favorites.forEach((favorite) => {
    // Create a container for each favorite APOD
    const favoriteElement = document.createElement("div");
    favoriteElement.className = "favorite-item";

    const favoriteDate = document.createElement("p");
    favoriteDate.textContent = favorite.date;

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.addEventListener("click", () => {
      displayAPOD(favorite.data);
    });

    favoriteElement.appendChild(favoriteDate);
    favoriteElement.appendChild(viewButton);
    favoritesContainer.appendChild(favoriteElement);
  });
}

function toggleMenu() {
  const menuOptions = document.getElementById('menuOptions');
  menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
}
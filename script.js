function toggleMenu() {
  const menuOptions = document.getElementById('menuOptions');
  menuOptions.style.display = (menuOptions.style.display === 'block') ? 'none' : 'block';
}
let isFavorite = false;

function toggleFavorite() {
  const heartIcon = document.getElementById('favoriteIcon');
  
  isFavorite = !isFavorite;

  if (isFavorite) {
    heartIcon.classList.add('favorite');
  } else {
    heartIcon.classList.remove('favorite');
  }
}

  
  
// Función para incrementar los clicks de una canción en el localStorage
function updateClick(songId) {
  // Verificamos si la canción ya existe en localStorage
  let clicks = JSON.parse(localStorage.getItem('songClicks')) || {};
  
  // Incrementamos el contador de clicks para la canción correspondiente
  if (clicks[songId]) {
    clicks[songId]++;
  } else {
    clicks[songId] = 1;
  }

  // Guardamos de nuevo los clicks en el localStorage
  localStorage.setItem('songClicks', JSON.stringify(clicks));
}

// Función para actualizar la sección de "Más Escuchadas"
function updatePopularSongs() {
  let clicks = JSON.parse(localStorage.getItem('songClicks')) || {};
  
  // Obtenemos todos los carruseles
  const carousels = document.querySelectorAll('.carrusel-container');
  
  // Filtramos el carrusel de "Más Escuchadas" (id="mas-escuchadas-carrusel")
  const popularCarousel = document.getElementById('mas-escuchadas-carrusel');

  if (!popularCarousel) return; // Si no existe el carrusel, no hacemos nada
  
  // Creamos un array de canciones con sus ids y clicks
  let songs = [];
  const songItems = popularCarousel.querySelectorAll('.card');
  
  songItems.forEach((item) => {
    const songId = item.getAttribute('data-id'); // Asegúrate de agregar un data-id único a cada card
    const songClickCount = clicks[songId] || 0; // Si no tiene clicks, ponemos 0
    songs.push({ id: songId, clicks: songClickCount, element: item });
  });

  // Ordenamos las canciones por el número de clicks (de mayor a menor)
  songs.sort((a, b) => b.clicks - a.clicks);

  // Vaciamos el carrusel y reordenamos las canciones
  popularCarousel.innerHTML = '';
  songs.forEach(song => {
    popularCarousel.appendChild(song.element);
  });
}

// Agregar evento de click a las cartas para actualizar los clicks
const allCards = document.querySelectorAll('.card');
allCards.forEach(card => {
  card.addEventListener('click', (event) => {
    const songId = event.currentTarget.getAttribute('data-id');
    updateClick(songId);
    updatePopularSongs();
  });
});

// Inicializar la actualización de "Más Escuchadas" al cargar la página
window.addEventListener('load', () => {
  updatePopularSongs();
});

function starProtector() {
      document.getElementById("protector").style.display = "block";
      document.getElementById("PTfondoOscuro").style.display = "block";
    }

    function downProtector() {
      document.getElementById("protector").style.display = "none";
      document.getElementById("PTfondoOscuro").style.display = "none";
    }

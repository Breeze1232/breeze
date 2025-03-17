// Obtener referencias a los elementos
const audio = document.getElementById("song");
const playPauseBtn = document.getElementById("playPauseBtn");
const skipBackBtn = document.getElementById("skipBack");
const skipForwardBtn = document.getElementById("skipForward");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("songTitle");
const songListToggle = document.getElementById("songListToggle");
const songList = document.getElementById("songList");
const closeSongListBtn = document.getElementById("closeSongList");
const songSearch = document.getElementById("songSearch"); // Campo de búsqueda
const currentTime = document.getElementById("currentTime"); // Tiempo transcurrido
const totalDuration = document.getElementById("totalDuration"); // Tiempo total de la canción

// Lista de canciones con sus títulos y artistas
const songs = [
    { title: "Yo era seguidor de la grasa", src: "esta canción para los fanáticos, es una acaricia al alma - xTwo..mp3", artist: "xTwo" },
    { title: "Imagine Dragons - Take Me To The Beach (feat. Ado)", src: "Imagine Dragons - Take Me To The Beach (feat. Ado) (Official Lyric Video) - ImagineDragonsVEVO.mp3", artist: "Imagine Dragons" },
    { title: "Aishite Aishite Aishite - ado", src: "Aishite Aishite Aishite - Ado.mp3", artist: "Ado" },
    { title: "unravel - tk from ling tosite sigure", src: "unravel - tk from ling tosite sigure.mp3", artist: "tk from ling tosite sigure" },
    { title: "Imagine Dragons x J.I.D - Enemy", src: "enemyimaginedragonsjid.mp3", artist: "Imagine Dragons" },
    { title: "【Ado】- うっせぇわ", src: "【Ado】うっせぇわ - Ado.mp3", artist: "Ado" },
];

let currentSongIndex = 0; // Índice de la canción actual

// Función para formatear el tiempo en minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Función para reproducir una canción
function playSong(index) {
    audio.src = songs[index].src; // Establece la canción de la lista
    songTitle.textContent = songs[index].title; // Cambia el nombre de la canción
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Usar el ícono de pausa
}

// Reproducir o pausar la canción
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Usar el ícono de pausa
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // Usar el ícono de reproducción
    }
});

// Retroceder a la canción anterior
skipBackBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1; // Si estamos en la primera canción, retrocedemos a la última
    playSong(currentSongIndex);
});

// Adelantar a la siguiente canción
skipForwardBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1; // Si estamos en la última canción, avanzamos a la primera
    playSong(currentSongIndex);
});

// Actualizar la barra de progreso y los tiempos
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        progress.value = progressValue;

        // Actualiza el tiempo transcurrido
        currentTime.textContent = formatTime(audio.currentTime);

        // Actualiza el tiempo total de la canción
        totalDuration.textContent = formatTime(audio.duration);
    }
});

// Permite cambiar la posición de la canción con la barra de progreso
progress.addEventListener("input", () => {
    const progressValue = progress.value * audio.duration / 100;
    audio.currentTime = progressValue;
});

// Cambiar a la siguiente canción cuando la actual termine
audio.addEventListener("ended", () => {
    skipForwardBtn.click(); // Reproduce la siguiente canción cuando termine
});

// Abrir o cerrar la lista de canciones
songListToggle.addEventListener("click", () => {
    songList.classList.toggle("visible");
});

// Cerrar la lista de canciones
closeSongListBtn.addEventListener("click", () => {
    songList.classList.remove("visible");
});

// Función para llenar la lista de canciones y artistas en el HTML
function fillSongList() {
    const songListItems = document.getElementById("songListItems");
    const artistListItems = document.getElementById("artistListItems");

    songs.forEach(song => {
        // Crear un elemento de lista para cada canción
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener("click", () => {
            const songElement = document.getElementById("song");
            songElement.src = song.src;
            songElement.play();
            songTitle.textContent = song.title;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Usar el ícono de pausa
        });
        songListItems.appendChild(songItem);

        // Crear un elemento de lista para cada artista
        const artistItem = document.createElement("li");
        artistItem.textContent = song.artist;
        artistItem.addEventListener("click", () => {
            const artistSongs = songs.filter(s => s.artist === song.artist);
            songListItems.innerHTML = ""; // Limpiar la lista actual
            artistSongs.forEach(artistSong => {
                const artistSongItem = document.createElement("li");
                artistSongItem.textContent = `${artistSong.title} - ${artistSong.artist}`;
                artistSongItem.addEventListener("click", () => {
                    const songElement = document.getElementById("song");
                    songElement.src = artistSong.src;
                    songElement.play();
                    songTitle.textContent = artistSong.title;
                    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Usar el ícono de pausa
                });
                songListItems.appendChild(artistSongItem);
            });
        });
        artistListItems.appendChild(artistItem);
    });
}

// Función para filtrar canciones
function filterSongs() {
    const searchQuery = songSearch.value.toLowerCase();
    const songListItems = document.getElementById("songListItems");

    // Filtrar las canciones basadas en el texto ingresado
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchQuery));

    // Limpiar la lista antes de agregar los elementos filtrados
    songListItems.innerHTML = "";

    // Agregar las canciones filtradas a la lista
    filteredSongs.forEach(song => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener("click", () => {
            const songElement = document.getElementById("song");
            songElement.src = song.src;
            songElement.play();
            songTitle.textContent = song.title;
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Usar el ícono de pausa
        });
        songListItems.appendChild(songItem);
    });
}

// Llamar a la función para llenar la lista de canciones al cargar la página
fillSongList();

// Vincular la función de filtrado al evento de entrada del campo de búsqueda
songSearch.addEventListener("input", filterSongs);

// Barra Lateral 
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

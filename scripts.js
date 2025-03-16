// Obtener referencias a los elementos
const audio = document.getElementById("song");
const playPauseBtn = document.getElementById("playPauseBtn");
const skipBackBtn = document.getElementById("skipBack");
const skipForwardBtn = document.getElementById("skipForward");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("songTitle");

// Lista de canciones con sus títulos y artistas
const songs = [
    { title: "Yo era seguidor de la grasa", src: "esta canción para los fanáticos, es una acaricia al alma - xTwo..mp3", artist: "xTwo" },
    { title: "Imagine Dragons - Take Me To The Beach (feat. Ado)", src: "Imagine Dragons - Take Me To The Beach (feat. Ado) (Official Lyric Video) - ImagineDragonsVEVO.mp3", artist: "Imagine Dragons" },
    { title: "Aishite Aishite Aishite - ado", src: "Aishite Aishite Aishite - Ado.mp3", artist: "Ado" },
    { title: "unravel - tk from ling tosite sigure", src: "unravel - tk from ling tosite sigure.mp3", artist: "tk from ling tosite sigure" },
];

let currentSongIndex = 0; // Índice de la canción actual

// Función para reproducir una canción
function playSong(index) {
    audio.src = songs[index].src; // Establece la canción de la lista
    songTitle.textContent = songs[index].title; // Cambia el nombre de la canción
    audio.play();
    playPauseBtn.textContent = "⏸️"; // Cambiar texto a Pausar
}

// Reproducir o pausar la canción
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️"; // Cambiar texto a Pausar
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️"; // Cambiar texto a Reproducir
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

// Actualizar la barra de progreso a medida que el audio se reproduce
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        progress.value = progressValue;
    }
});

// Función para abrir/ocultar la lista de canciones
const songListToggle = document.getElementById("songListToggle");
const songList = document.getElementById("songList");

songListToggle.addEventListener("click", () => {
    songList.style.display = songList.style.display === "block" ? "none" : "block"; // Alternar entre mostrar y ocultar la lista
});

// Función para cerrar la lista
const closeSongListBtn = document.getElementById("closeSongList");

closeSongListBtn.addEventListener("click", () => {
    songList.style.display = "none"; // Cerrar la lista de canciones
});

// Función para filtrar canciones por nombre
function filterSongs() {
    const searchQuery = document.getElementById("songSearch").value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchQuery));

    // Actualizar la lista de canciones filtradas
    const songListItems = document.getElementById("songListItems");
    songListItems.innerHTML = ""; // Limpiar la lista

    filteredSongs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.addEventListener("click", () => {
            currentSongIndex = songs.indexOf(song);
            playSong(currentSongIndex);
            songList.style.display = "none"; // Cerrar la lista cuando seleccionamos una canción
        });
        songListItems.appendChild(listItem);
    });
}

// Mostrar todos los artistas en el listado
const artistListItems = document.getElementById("artistListItems");
const artists = [...new Set(songs.map(song => song.artist))]; // Obtener una lista única de artistas

artists.forEach(artist => {
    const listItem = document.createElement("li");
    listItem.textContent = artist;
    artistListItems.appendChild(listItem);
});


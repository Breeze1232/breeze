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
const songSearch = document.getElementById("songSearch");
const currentTime = document.getElementById("currentTime");
const totalDuration = document.getElementById("totalDuration");

// Listaa de canciones organizadas por artista
const songsByArtist = {
    "xTwo": [
        { title: "Yo era seguidor de la grasa", src: "music/esta canción para los fanáticos, es una acaricia al alma - xTwo..mp3" }
    ],
    "Imagine Dragons": [
        { title: "Take Me To The Beach (feat. Ado)", src: "/music/Imagine Dragons - Take Me To The Beach (feat. Ado) (Official Lyric Video) - ImagineDragonsVEVO.mp3" },
        { title: "Enemy (feat. J.I.D)", src: "music/enemyimaginedragonsjid.mp3" }
    ],
    "Ado": [
        { title: "Aishite Aishite Aishite", src: "music/Aishite Aishite Aishite - Ado.mp3" },
        { title: "うっせぇわ", src: "music/【Ado】うっせぇわ - Ado.mp3" }
    ],
    "tk from ling tosite sigure": [
        { title: "Unravel", src: "music/unravel - tk from ling tosite sigure.mp3" }
    ]
};

// Convertir el objeto en un array plano de canciones
const songs = Object.entries(songsByArtist).flatMap(([artist, tracks]) =>
    tracks.map(track => ({ ...track, artist }))
);

let currentSongIndex = 0; // Índice de la canción actual

// Función para formatear el tiempo en minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Función para reproducir una canción
function playSong(index) {
    if (index < 0 || index >= songs.length) return; // Evitar errores de índice
    currentSongIndex = index;
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = `${song.title} - ${song.artist}`;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Reproducir o pausar la canción
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

// Retroceder a la canción anterior
skipBackBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;
    playSong(currentSongIndex);
});

// Adelantar a la siguiente canción
skipForwardBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1;
    playSong(currentSongIndex);
});

// Actualizar la barra de progreso y los tiempos
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        progress.value = progressValue;
        currentTime.textContent = formatTime(audio.currentTime);
        totalDuration.textContent = formatTime(audio.duration);
    }
});

// Permite cambiar la posición de la canción con la barra de progreso
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value * audio.duration) / 100;
});

// Cambiar a la siguiente canción cuando la actual termine
audio.addEventListener("ended", () => {
    skipForwardBtn.click();
});

// Abrir o cerrar la lista de canciones
songListToggle.addEventListener("click", () => {
    songList.classList.toggle("visible");
});

// Cerrar la lista de canciones
closeSongListBtn.addEventListener("click", () => {
    songList.classList.remove("visible");
});

// Función para llenar la lista de canciones y artistas
function fillSongList() {
    const songListItems = document.getElementById("songListItems");
    const artistListItems = document.getElementById("artistListItems");

    Object.keys(songsByArtist).forEach(artist => {
        const artistItem = document.createElement("li");
        artistItem.textContent = artist;
        artistItem.addEventListener("click", () => {
            songListItems.innerHTML = ""; // Limpiar la lista actual
            songsByArtist[artist].forEach(song => {
                const songItem = document.createElement("li");
                songItem.textContent = `${song.title} - ${artist}`;
                songItem.addEventListener("click", () => {
                    const index = songs.findIndex(s => s.title === song.title && s.artist === artist);
                    playSong(index);
                });
                songListItems.appendChild(songItem);
            });
        });
        artistListItems.appendChild(artistItem);
    });

    // Llenar la lista de canciones
    songs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener("click", () => playSong(index));
        songListItems.appendChild(songItem);
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
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.title} - ${song.artist}`;
        songItem.addEventListener("click", () => playSong(index));
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

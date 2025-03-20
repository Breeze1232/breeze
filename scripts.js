document.addEventListener("DOMContentLoaded", () => {
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
    const songListItems = document.getElementById("songListItems");
    const artistListItems = document.getElementById("artistListItems");

    // Lista de canciones organizadas por artista
    const songsByArtist = {
        "xTwo": [
            { title: "Yo era seguidor de la grasa", src: "prueba2.mp3" }
        ],
        "Imagine Dragons": [
            { title: "Take Me To The Beach (feat. Ado)", src: "music/Imagine Dragons - Take Me To The Beach (feat. Ado).mp3" },
            { title: "Enemy (feat. J.I.D)", src: "music/prueba1.mp3" }
        ],
        "Ado": [
            { title: "Aishite Aishite Aishite", src: "music/Aishite Aishite Aishite - Ado.mp3" },
            { title: "うっせぇわ", src: "music/【Ado】うっせぇわ - Ado.mp3" }
        ],
        "tk from ling tosite sigure": [
            { title: "Unravel", src: "music/unravel - tk from ling tosite sigure.mp3" }
        ]
    };

    // Convertir el objeto en una lista de canciones
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
    if (index < 0 || index >= songs.length) return; // Evita errores de índice
    currentSongIndex = index;
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = `${song.title} - ${song.artist}`;

    // Esperar un momento para asegurar que el archivo se carga antes de intentar reproducirlo
    setTimeout(() => {
        audio.load(); // Forzar la recarga del audio
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }).catch(() => {
                console.warn(`Reintentando reproducción: ${song.title}`);
                setTimeout(() => {
                    audio.play().catch(() => {
                        showErrorMessage("Ocurrió un problema al reproducir.");
                        skipForward();
                    });
                }, 500); // Intentar reproducir de nuevo tras 500ms
            });
        }
    }, 100); // Esperar 100ms antes de intentar la reproducción
}

    // Función para mostrar mensajes de error
    function showErrorMessage(message) {
        const errorBox = document.createElement("div");
        errorBox.textContent = message;
        errorBox.style.position = "fixed";
        errorBox.style.bottom = "1px";
        errorBox.style.left = "50%";
        errorBox.style.transform = "translateX(-50%)";
        errorBox.style.backgroundColor = "#ff4444";
        errorBox.style.color = "white";
        errorBox.style.padding = "5px 140px";
        errorBox.style.borderRadius = "5px";
        errorBox.style.zIndex = "1000";
        document.body.appendChild(errorBox);
        setTimeout(() => errorBox.remove(), 3000);
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
    function skipForward() {
        currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1;
        playSong(currentSongIndex);
    }

    skipForwardBtn.addEventListener("click", skipForward);

    // Actualizar la barra de progreso y los tiempos
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            progress.value = (audio.currentTime / audio.duration) * 100;
            currentTime.textContent = formatTime(audio.currentTime);
            totalDuration.textContent = formatTime(audio.duration);
        }
    });

    // Permite cambiar la posición de la canción con la barra de progreso
    progress.addEventListener("input", () => {
        audio.currentTime = (progress.value * audio.duration) / 100;
    });

    // Cambiar a la siguiente canción cuando la actual termine
    audio.addEventListener("ended", skipForward);

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
        songListItems.innerHTML = "";

        songs.filter(song => song.title.toLowerCase().includes(searchQuery))
             .forEach((song, index) => {
                 const songItem = document.createElement("li");
                 songItem.textContent = `${song.title} - ${song.artist}`;
                 songItem.addEventListener("click", () => playSong(index));
                 songListItems.appendChild(songItem);
             });
    }

    songSearch.addEventListener("input", filterSongs);
    fillSongList();
});

// Función para abrir/cerrar la barra lateral
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

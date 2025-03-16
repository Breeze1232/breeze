// Obtener referencias a los elementos
const audio = document.getElementById("song");
const playPauseBtn = document.getElementById("playPauseBtn");
const skipBackBtn = document.getElementById("skipBack");
const skipForwardBtn = document.getElementById("skipForward");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("songTitle");

// Lista de canciones con sus títulos
const songs = [
    { title: "Yo era seguidor de la grasa", src: "esta canción para los fanáticos, es una acaricia al alma - xTwo..mp3" },
    { title: "Imagine Dragons - Take Me To The Beach (feat. Ado)", src: "Imagine Dragons - Take Me To The Beach (feat. Ado) (Official Lyric Video) - ImagineDragonsVEVO.mp3" },
    { title: "Aishite Aishite Aishite - ado", src: "Aishite Aishite Aishite - Ado.mp3" },
    { title: "unravel - tk from ling tosite sigure", src: "unravel - tk from ling tosite sigure.mp3" },
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
        progress.value = progressValue; // Actualizar el valor del rango
    }
});

// Cambiar el tiempo de reproducción del audio al mover el rango
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Cuando la canción termine, ponerla en pausa
audio.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶️"; // Cambiar el texto del botón a 'Reproducir'
    progress.value = 0; // Resetear la barra de progreso
    audio.pause(); // Poner el audio en pausa
});

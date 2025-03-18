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

// Lista de canciones con sus títulos y artistas
const songs = [
    { title: "Yo era seguidor de la grasa", src: "song1.mp3", artist: "xTwo" },
    { title: "Imagine Dragons - Take Me To The Beach", src: "song2.mp3", artist: "Imagine Dragons" },
    { title: "Aishite Aishite Aishite", src: "song3.mp3", artist: "Ado" },
    { title: "unravel", src: "song4.mp3", artist: "tk from ling tosite sigure" },
    { title: "Enemy", src: "song5.mp3", artist: "Imagine Dragons" },
    { title: "うっせぇわ", src: "song6.mp3", artist: "Ado" },
];

let currentSongIndex = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function playSong(index) {
    if (index < 0 || index >= songs.length) return;
    
    currentSongIndex = index;
    audio.src = songs[currentSongIndex].src;
    songTitle.textContent = songs[currentSongIndex].title;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

skipBackBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;
    playSong(currentSongIndex);
});

skipForwardBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        totalDuration.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
    skipForwardBtn.click();
});

songListToggle.addEventListener("click", () => {
    songList.classList.toggle("visible");
});

closeSongListBtn.addEventListener("click", () => {
    songList.classList.remove("visible");
});

function fillSongList() {
    const songListItems = document.getElementById("songListItems");
    songListItems.innerHTML = "";

    songs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.textContent = song.title;
        songItem.addEventListener("click", () => playSong(index));
        songListItems.appendChild(songItem);
    });
}

songSearch.addEventListener("input", () => {
    const query = songSearch.value.toLowerCase();
    const songListItems = document.getElementById("songListItems");
    songListItems.innerHTML = "";
    
    songs.filter(song => song.title.toLowerCase().includes(query)).forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.textContent = song.title;
        songItem.addEventListener("click", () => playSong(index));
        songListItems.appendChild(songItem);
    });
});

fillSongList();

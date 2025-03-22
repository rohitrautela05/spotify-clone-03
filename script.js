console.log("Welcome to Spotify");

let songindex = 0;
let audioelement = new Audio('songs/1.m4a');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let mastersongname = document.getElementById('mastersongname');

let songs = [
    { songname: "Be With You - Akon", filepath: "songs/1.m4a", coverpath: "covers/1.jpg" },
    { songname: "Closer - The Chainsmokers", filepath: "songs/2.m4a", coverpath: "covers/2.jpg" },
    { songname: "Girls Like You - Maroon 5", filepath: "songs/3.m4a", coverpath: "covers/3.jpg" },
    { songname: "Heat Waves - Glass Animals", filepath: "songs/4.m4a", coverpath: "covers/4.jpg" },
    { songname: "Night Changes - One Direction", filepath: "songs/5.m4a", coverpath: "covers/5.jpg" },
    { songname: "Perfect - Ed Sheeran", filepath: "songs/6.m4a", coverpath: "covers/6.jpg" },
    { songname: "Rude - MAGIC!", filepath: "songs/7.m4a", coverpath: "covers/7.jpg" },
    { songname: "Señorita - Shawn Mendes, Camila Cabello", filepath: "songs/8.m4a", coverpath: "covers/8.jpg" },
    { songname: "Shape of You - Ed Sheeran", filepath: "songs/9.m4a", coverpath: "covers/9.jpg" },
    { songname: "Stay - The Kid LAROI, Justin Bieber", filepath: "songs/10.m4a", coverpath: "covers/10.jpg" },
    { songname: "Steal My Girl - One Direction", filepath: "songs/11.m4a", coverpath: "covers/11.jpg" },
    { songname: "We Don't Talk Anymore - Charlie Puth", filepath: "songs/12.m4a", coverpath: "covers/12.jpg" }
];

// Set song names and cover images
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songname;
});

// Function to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Master play/pause button
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioelement.addEventListener('timeupdate', () => {
    let progress = (audioelement.currentTime / audioelement.duration) * 100;
    myprogressbar.value = progress;
});

// Seek song using progress bar
myprogressbar.addEventListener('input', () => {
    audioelement.currentTime = (myprogressbar.value * audioelement.duration) / 100;
});

// Handle individual song play/pause
Array.from(document.getElementsByClassName('songitemplay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songindex === index && !audioelement.paused) {
            audioelement.pause();
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterplay.classList.remove('fa-pause');
            masterplay.classList.add('fa-play');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songindex = index;
            audioelement.src = songs[songindex].filepath;
            audioelement.currentTime = 0;
            audioelement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
            mastersongname.innerText = songs[songindex].songname;
            gif.style.opacity = 1;
        }
    });
});

// Play next song
document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length; // Ensures looping back to first song
    playSelectedSong();
});

// Play previous song
document.getElementById('previous').addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length; // Loop to last song if at 0
    playSelectedSong();
});

// Function to play selected song
function playSelectedSong() {
    audioelement.src = songs[songindex].filepath;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    mastersongname.innerText = songs[songindex].songname;
    gif.style.opacity = 1;

    makeAllPlays();
    let songItemPlay = document.getElementsByClassName('songitemplay')[songindex];
    if (songItemPlay) {
        songItemPlay.classList.remove('fa-play');
        songItemPlay.classList.add('fa-pause');
    }
}

// Auto-play next song when current song ends
audioelement.addEventListener('ended', () => {
    songindex = (songindex + 1) % songs.length;
    playSelectedSong();
});

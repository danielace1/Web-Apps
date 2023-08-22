const nowPlayingEl = document.querySelector(".now-playing");
const trackArt = document.querySelector(".track-image");
const trackName = document.querySelector(".track-name");
const trackArtist = document.querySelector(".track-artist");

const playpauseBtnEl = document.querySelector(".playpause-track");
const next_Track = document.querySelector(".next-track");
const prev_Track = document.querySelector(".prev-track");

const seekSliderEl = document.querySelector(".seek-slider");
const curr_time = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const randomIcon = document.querySelector(".fa-random");
const curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
  {
    img: "assets/img/LetMeDownSlowly.jpg",
    name: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    music: "assets/music/Let Me Down Slowly - Alec Benjamin.mp3",
  },
  {
    img: "assets/img/BlindingLights.jpg",
    name: "Blinding Lights",
    artist: "The Weeknd",
    music: "assets/music/Blinding Lights - The Weeknd.mp3",
  },
  {
    img: "assets/img/Faded.jpg",
    name: "Faded",
    artist: "Alan Walker",
    music: "assets/music/Faded - Alan Walker.mp3",
  },
  {
    img: "assets/img/Senorita.jpg",
    name: "Señorita",
    artist: "Shawn Mendes, Camila Cabello",
    music: "assets/music/SeÃ orita - Shawn Mendes, Camila Cabello.mp3",
  },
  {
    img: "assets/img/Levitating.jpg",
    name: "Levitating",
    artist: "Dua Lipa, DaBaby",
    music: "assets/music/Levitating (feat. DaBaby) - Dua Lipa, DaBaby.mp3",
  },
  {
    img: "assets/img/Believer.jpg",
    name: "Believer",
    artist: "Imagine Dragons",
    music: "assets/music/Believer - Imagine Dragons.mp3",
  },
  {
    img: "assets/img/Dandelions.jpg",
    name: "Dandelions",
    artist: "Ruth B",
    music: "assets/music/Dandelions - Ruth B.mp3",
  },
  {
    img: "assets/img/Peaches.jpg",
    name: "Peaches",
    artist: "Justin Bieber",
    music: "assets/music/Peaches - Justin Bieber.mp3",
  },
  {
    img: "assets/img/ShapeofYou.jpg",
    name: "Shape of You",
    artist: "Ed Sheeran",
    music: "assets/music/Shape of You - Ed Sheeran.mp3",
  },
  {
    img: "assets/img/IndustryBaby.jpg",
    name: "INDUSTRY BABY",
    artist: "Lil Nas X",
    music:
      "assets/music/INDUSTRY BABY - Lil Nas X, Jack Harlow, Lil Nas X   Jack Har.mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = musicList[track_index].music;
  curr_track.load();

  trackArt.style.backgroundImage = "url(" + musicList[track_index].img + ")";
  trackName.textContent = musicList[track_index].name;
  trackArtist.textContent = musicList[track_index].artist;
  nowPlayingEl.textContent =
    "Playing music " + (track_index + 1) + " of " + musicList.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSliderEl.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  trackArt.classList.add("rotate");
  playpauseBtnEl.innerHTML = '<i class="fa fa-pause-circle"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  trackArt.classList.remove("rotate");
  playpauseBtnEl.innerHTML = '<i class="fa fa-play-circle"></i>';
}

function nextTrack() {
  if (track_index < musicList.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < musicList.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * musicList.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = musicList.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seekSliderEl.value / 100);
  curr_track.currentTime = seekto;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seekSliderEl.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

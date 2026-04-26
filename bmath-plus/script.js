console.log("script loaded");

const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = "";

/* 🎮 LOAD GAMES */
function loadGames() {
  grid.innerHTML = "";

  games.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <img src="${g.icon}">
      <div>${g.name}</div>
    `;

    div.onclick = () => openGame(g);
    grid.appendChild(div);
  });
}

/* 🎮 OPEN GAME */
function openGame(g) {
  currentGame = g.file;
  frame.src = g.file;
  title.innerText = g.name;
  modal.classList.remove("hidden");
}

/* CLOSE GAME */
function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
}

/* FULLSCREEN */
function fullscreenGame() {
  frame.requestFullscreen?.();
}

/* NEW TAB */
function openNewTab() {
  window.open(currentGame, "_blank");
}

/* 🔎 GAME SEARCH */
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  document.querySelectorAll(".game").forEach(el => {
    el.style.display =
      el.innerText.toLowerCase().includes(val) ? "block" : "none";
  });
});

/* 📩 REQUEST SYSTEM */
let requests = [];

function addRequest() {
  const input = document.getElementById("requestInput");
  if (!input.value.trim()) return;

  requests.push(input.value);
  document.getElementById("requestList").innerHTML =
    requests.map(r => `<li>${r}</li>`).join("");

  input.value = "";
}

/* 🎵 MUSIC SYSTEM */
const musicSearch = document.getElementById("musicSearch");
const musicResults = document.getElementById("musicResults");
const musicPlayer = document.getElementById("musicPlayer");
const musicFrame = document.getElementById("musicFrame");
const nowPlaying = document.getElementById("nowPlaying");

const songs = [
  { name: "Golden Hour - JVKE", query: "JVKE Golden Hour" },
  { name: "Golden - Harry Styles", query: "Harry Styles Golden" },
  { name: "Heat Waves - Glass Animals", query: "Heat Waves Glass Animals" }
];

musicSearch.addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  musicResults.innerHTML = "";

  songs
    .filter(s => s.name.toLowerCase().includes(val))
    .forEach(song => {
      const div = document.createElement("div");
      div.className = "song";
      div.innerText = song.name;

      div.onclick = () => playSong(song);
      musicResults.appendChild(div);
    });
});

function playSong(song) {
  musicFrame.src =
    "https://www.youtube.com/embed?listType=search&list=" +
    encodeURIComponent(song.query);

  nowPlaying.innerText = "Now Playing: " + song.name;
  musicPlayer.classList.remove("hidden");
}

function closeMusic() {
  musicPlayer.classList.add("hidden");
  musicFrame.src = "";
}

/* INIT */
loadGames();

console.log("B-Math+ script loaded");

/* ===== SAFE ELEMENT GETTERS ===== */
const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

/* Prevent crash if HTML missing something */
if (!grid || !modal || !frame || !title) {
  console.error("Missing required HTML elements!");
}

/* ===== CURRENT GAME ===== */
let currentGame = "";

/* ===== LOAD GAMES ===== */
function loadGames() {
  if (!grid || typeof games === "undefined") {
    console.error("games list missing!");
    return;
  }

  grid.innerHTML = "";

  games.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <img src="${g.icon}" onerror="this.style.display='none'">
      <div>${g.name}</div>
    `;

    div.onclick = () => openGame(g);
    grid.appendChild(div);
  });
}

/* ===== OPEN GAME ===== */
function openGame(g) {
  if (!g || !g.file) {
    console.error("Game file missing:", g);
    return;
  }

  currentGame = g.file;
  frame.src = g.file;
  title.innerText = g.name;
  modal.classList.remove("hidden");
}

/* ===== CLOSE GAME ===== */
function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
}

/* ===== FULLSCREEN ===== */
function fullscreenGame() {
  frame.requestFullscreen?.();
}

/* ===== NEW TAB ===== */
function openNewTab() {
  if (currentGame) {
    window.open(currentGame, "_blank");
  }
}

/* ===== SEARCH GAMES ===== */
const search = document.getElementById("search");

if (search) {
  search.addEventListener("input", e => {
    const val = e.target.value.toLowerCase();

    document.querySelectorAll(".game").forEach(el => {
      el.style.display =
        el.innerText.toLowerCase().includes(val) ? "block" : "none";
    });
  });
}

/* ===== INIT SAFELY ===== */
window.addEventListener("DOMContentLoaded", () => {
  loadGames();
});

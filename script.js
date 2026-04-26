console.log("B-Math loaded safely");

/* ELEMENTS */
const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = "";

/* SAFETY: NEVER OPEN ANYTHING ON LOAD */
function loadGames() {
  if (!grid || typeof games === "undefined") {
    console.error("Missing grid or games array");
    return;
  }

  grid.innerHTML = "";

  games.forEach(g => {
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
      <img src="${g.icon}" alt="${g.name}">
      <div>${g.name}</div>
    `;

    // ONLY OPENS ON CLICK
    card.addEventListener("click", () => openGame(g));

    grid.appendChild(card);
  });
}

/* OPEN GAME (ONLY CLICK TRIGGERED) */
function openGame(g) {
  if (!g || !g.file) return;

  currentGame = g.file;
  frame.src = g.file;
  title.textContent = g.name;
  modal.classList.remove("hidden");
}

/* CLOSE GAME */
function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
  currentGame = "";
}

/* FULLSCREEN */
function fullscreenGame() {
  frame.requestFullscreen?.();
}

/* NEW TAB */
function openNewTab() {
  if (currentGame) {
    window.open(currentGame, "_blank");
  }
}

/* INIT — HARD STOP AUTO OPEN BUG */
window.addEventListener("DOMContentLoaded", () => {
  modal.classList.add("hidden"); // FORCE CLOSED ON LOAD
  loadGames();
});

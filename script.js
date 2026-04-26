// B-Math loading...
console.log("B-Math loading...");

const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = null;

function loadGames() {
  if (!grid) {
    console.error("gameGrid missing");
    return;
  }

  if (!window.games || !Array.isArray(window.games)) {
    console.error("games not loaded");
    return;
  }

  grid.innerHTML = "";

  window.games.forEach(g => {
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
      <img src="${g.icon || ''}" alt="${g.name || 'game'}">
      <div>${g.name || 'Untitled'}</div>
    `;

    card.addEventListener("click", () => openGame(g));
    grid.appendChild(card);
  });
}

function openGame(g) {
  if (!g || !g.file) return;

  currentGame = g;

  if (frame) frame.src = g.file;
  if (title) title.textContent = g.name || "Game";

  if (modal) modal.classList.remove("hidden");
}

function closeGame() {
  if (modal) modal.classList.add("hidden");
  if (frame) frame.src = "";
  currentGame = null;
}

window.addEventListener("DOMContentLoaded", () => {
  if (modal) modal.classList.add("hidden");
  loadGames();

  const closeBtn = document.getElementById("closeBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeGame);
});

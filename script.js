console.log("B-Math loading...");

const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = "";

function loadGames() {
  if (!grid) {
    console.error("gameGrid missing");
    return;
  }

  if (!window.games) {
    console.error("games not loaded");
    return;
  }

  grid.innerHTML = "";

  window.games.forEach(g => {
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
      <img src="${g.icon}">
      <div>${g.name}</div>
    `;

    card.onclick = () => openGame(g);
    grid.appendChild(card);
  });
}

function openGame(g) {
  if (!g?.file) return;

  frame.src = g.file;
  title.textContent = g.name;
  modal.classList.remove("hidden");
}

function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
}

window.addEventListener("DOMContentLoaded", () => {
  modal.classList.add("hidden");   // 🚨 FIXES YOUR CURRENT BUG
  loadGames();
});

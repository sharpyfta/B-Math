console.log("B-Math loaded");

const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = "";

function loadGames() {
  if (!grid || typeof games === "undefined") {
    console.error("Game grid or games list missing");
    return;
  }

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

function openGame(g) {
  currentGame = g.file;
  frame.src = g.file;
  title.innerText = g.name;
  modal.classList.remove("hidden");
}

function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
}

function fullscreenGame() {
  frame.requestFullscreen?.();
}

function openNewTab() {
  window.open(currentGame, "_blank");
}

window.addEventListener("DOMContentLoaded", loadGames);

const grid = document.getElementById("gameGrid");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const title = document.getElementById("gameTitle");

let currentGame = "";

/* LOAD GAMES INTO GRID */
function loadGames() {
  grid.innerHTML = "";

  games.forEach(g => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
      <img src="${g.icon}" alt="${g.name}">
      <div>${g.name}</div>
    `;

    div.onclick = () => openGame(g);

    grid.appendChild(div);
  });
}

/* OPEN GAME (UPDATED LOCAL HTML SYSTEM) */
function openGame(g) {
  currentGame = g.file; // uses local HTML file
  frame.src = g.file;
  title.innerText = g.name;
  modal.classList.remove("hidden");
}

/* CLOSE GAME */
function closeGame() {
  modal.classList.add("hidden");
  frame.src = "";
  currentGame = "";
}

/* FULLSCREEN GAME */
function fullscreenGame() {
  frame.requestFullscreen?.();
}

/* OPEN IN NEW TAB */
function openNewTab() {
  window.open(currentGame, "_blank");
}

/* GAME REQUEST SYSTEM */
let requests = [];

function addRequest() {
  const input = document.getElementById("requestInput");

  if (!input.value.trim()) return;

  requests.push(input.value);
  renderRequests();
  input.value = "";
}

function renderRequests() {
  document.getElementById("requestList").innerHTML =
    requests.map(r => `<li>${r}</li>`).join("");
}

/* SEARCH FILTER */
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  document.querySelectorAll(".game").forEach(el => {
    el.style.display =
      el.innerText.toLowerCase().includes(val) ? "block" : "none";
  });
});

/* INIT */
loadGames();

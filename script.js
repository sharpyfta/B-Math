import { games } from "./games.js";

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const frame = document.getElementById("frame");
const title = document.getElementById("title");
const closeBtn = document.getElementById("closeBtn");
const searchBar = document.getElementById("searchBar");

function loadGames(list = games) {
  grid.innerHTML = "";

  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game";

    card.innerHTML = `
      <img src="${game.icon}" />
      <p>${game.name}</p>
    `;

    card.onclick = () => {
      title.textContent = game.name;
      frame.src = game.file;
      modal.style.display = "flex";
    };

    grid.appendChild(card);
  });
}

closeBtn.onclick = () => {
  modal.style.display = "none";
  frame.src = "";
};

searchBar.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  loadGames(
    games.filter(g => g.name.toLowerCase().includes(value))
  );
});

loadGames();

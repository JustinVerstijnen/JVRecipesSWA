const items = [
  {
    "title": "Pizza",
    "description": "A recipe page for making pizza.",
    "url": "pizza/index.html",
    "image": "pizza/pizza.png",
    "icon": "🍕"
  }
];

const grid = document.getElementById("toolsGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const year = document.getElementById("year");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createImage(item) {
  const title = escapeHtml(item.title);

  if (item.image) {
    return `<img class="tool-image" src="${escapeHtml(item.image)}" alt="${title} preview" loading="lazy" />`;
  }

  return `<div class="tool-icon-fallback" aria-hidden="true">${escapeHtml(item.icon || "✨")}</div>`;
}

function createItemCard(item) {
  const article = document.createElement("article");
  article.className = "tool-card";

  const title = escapeHtml(item.title);
  const description = escapeHtml(item.description);
  const url = escapeHtml(item.url);
  const displayUrl = escapeHtml(item.displayUrl || item.url.replace(/^https?:\/\//, "").replace(/\/index\.html$/, ""));

  article.innerHTML = `
    <a class="tool-image-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title}">
      ${createImage(item)}
    </a>
    <div class="tool-content">
      <h2 class="tool-title">${title}</h2>
      <p class="tool-description">${description}</p>
      <div class="tool-actions">
        <a class="tool-primary" href="${url}" target="_blank" rel="noopener noreferrer">Open</a>
      </div>
      <a class="shortcut-link" href="${url}" target="_blank" rel="noopener noreferrer">${displayUrl}</a>
    </div>
  `;

  return article;
}

function renderItems(query = "") {
  const search = query.trim().toLowerCase();
  const filtered = items.filter((item) => {
    return [item.title, item.description, item.url, item.displayUrl]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  grid.innerHTML = "";
  filtered.forEach((item) => grid.appendChild(createItemCard(item)));
  emptyState.style.display = filtered.length ? "none" : "block";
}

if (year) {
  year.textContent = new Date().getFullYear();
}

searchInput.addEventListener("input", (event) => renderItems(event.target.value));
renderItems();

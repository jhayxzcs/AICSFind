const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5ZY-6VUb1wvuOie8G1EN24xmsOHqvSnck-fu4mNidTb34RhKrNgSD6FJ7qIXPcK-U/exec";

let allItems = [];

const resultsGrid = document.getElementById("resultsGrid");
const noResults = document.getElementById("noResults");
const loadingText = document.getElementById("loadingText");

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function renderItems(list) {
  resultsGrid.innerHTML = "";
  document.getElementById("resultsCount").textContent = `${list.length} item${list.length !== 1 ? "s" : ""} found`;

  if (list.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  list.forEach(item => {
    const row = document.createElement("div");
    row.className = "item-row";
    row.innerHTML = `
            <div class="item-row-thumb">
        ${item.image_url
          ? `<img src="${item.image_url}" alt="${item.item_name}">`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`}
      </div>
      <div class="item-row-info">
        <h3 class="item-row-title">${item.item_name}</h3>
        <p class="item-row-desc">${item.description}</p>
        <span class="badge badge-${item.status}">${item.status === "found" ? "Found" : "Lost"}</span>
      </div>

                  <div class="item-row-meta">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${item.status === "found" ? "Found on" : "Lost on"}: ${formatDate(item.date_reported)}</span>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${item.location}</span>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg> ${item.contact}</span>
      </div>
    `;
    resultsGrid.appendChild(row);
  });

  
}

function filterItems() {
  const keyword = document.getElementById("keywordInput").value.toLowerCase().trim();
  const category = document.getElementById("categorySelect").value;

  const filtered = allItems.filter(item => {
    const matchesKeyword =
      !keyword ||
      item.item_name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword);

    const matchesCategory = !category || item.status === category;

    return matchesKeyword && matchesCategory;
  });

  renderItems(filtered);
}

function loadItems() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      allItems = data.reverse();
      loadingText.style.display = "none";
      renderItems(allItems);
    })
    .catch(err => {
      loadingText.textContent = "Failed to load items. Please try again later.";
      console.error(err);
    });
}

document.getElementById("searchBtn").addEventListener("click", filterItems);
document.getElementById("keywordInput").addEventListener("keyup", function (e) {
  if (e.key === "Enter") filterItems();
});
document.getElementById("categorySelect").addEventListener("change", filterItems);

loadItems();
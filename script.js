// ROKU Curated Registry (Single Source of Truth)
const curatedRegistry = [
  {
    token: "758263",
    name: "First Curated Business",
    description: "The inaugural business verified inside the ROKU ecosystem.",
    status: "verified",
    category: "Foundational"
  }
];

// Elements
const grid = document.getElementById("business-grid");
const view = document.getElementById("business-view");
const content = document.getElementById("business-content");

// Render registry cards
function renderRegistry() {
  grid.innerHTML = "";

  curatedRegistry.forEach(business => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${business.name}</h3>
      <p>${business.description}</p>
      <div class="token">TOKEN ${business.token}</div>
    `;

    card.onclick = () => {
      location.hash = `business-${business.token}`;
    };

    grid.appendChild(card);
  });
}

// Render business page
function renderBusiness(token) {
  const business = curatedRegistry.find(b => b.token === token);
  if (!business) return;

  content.innerHTML = `
    <h2>${business.name}</h2>
    <p>${business.description}</p>
    <p><strong>Status:</strong> ${business.status}</p>
    <p><strong>Category:</strong> ${business.category}</p>
    <div class="token">ROKU TOKEN ${business.token}</div>
    <br><br>
    <a href="#registry">← Back to Registry</a>
  `;

  view.classList.remove("hidden");
  document.getElementById("registry").classList.add("hidden");
}

// Router
function router() {
  const hash = location.hash;

  if (hash.startsWith("#business-")) {
    const token = hash.replace("#business-", "");
    renderBusiness(token);
  } else {
    view.classList.add("hidden");
    document.getElementById("registry").classList.remove("hidden");
  }
}

renderRegistry();
router();
window.addEventListener("hashchange", router);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

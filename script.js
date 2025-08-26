// CATALOG PAGE: build 50 products + add-to-favorites (with quantity)
window.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");

  // Create 50 products (name + image only)
  const products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      image: `images/product${i}.jpg`, // change to .png if your files are png
    });
  }

  // Render catalog
  function displayProducts() {
    productGrid.innerHTML = "";
    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:12px;" loading="lazy">
        <h3>${p.name}</h3>
        <button class="fav-btn" data-id="${p.id}">Add to Favorites</button>
      `;
      productGrid.appendChild(card);
    });

    // Wire up add-to-favorites buttons
    productGrid.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.getAttribute("data-id"));
        addToFavorites(id);
      });
    });
  }

  // Add (or increase) in favorites (stored in localStorage)
  function addToFavorites(id) {
    const item = products.find((p) => p.id === id);
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const existing = favorites.find((f) => f.id === id);

    if (existing) {
      existing.qty = (existing.qty || 1) + 1; // increase qty
      alert(`${existing.name} quantity increased to ${existing.qty}.`);
    } else {
      favorites.push({ id: item.id, name: item.name, image: item.image, qty: 1 });
      alert(`${item.name} added to favorites!`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  displayProducts();
});

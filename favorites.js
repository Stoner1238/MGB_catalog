// FAVORITES PAGE: show items with image + qty controls + remove + WhatsApp (with image links)
window.addEventListener("DOMContentLoaded", () => {
  const favoritesGrid = document.getElementById("favorites-grid");
  const sendBtn = document.getElementById("send-whatsapp");

  function loadFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
  function saveFavorites(list) {
    localStorage.setItem("favorites", JSON.stringify(list));
  }

  function renderFavorites() {
    const favorites = loadFavorites();
    favoritesGrid.innerHTML = "";

    if (favorites.length === 0) {
      favoritesGrid.innerHTML = "<p>No favorites yet.</p>";
      return;
    }

    favorites.forEach((p) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:12px;">
        <h3>${p.name}</h3>

        <div class="qty-row" style="display:flex; align-items:center; gap:.5rem; justify-content:center; margin:.5rem 0;">
          <button class="qty-btn dec" data-id="${p.id}" aria-label="Decrease">−</button>
          <span class="qty" style="min-width:2ch; text-align:center;">${p.qty || 1}</span>
          <button class="qty-btn inc" data-id="${p.id}" aria-label="Increase">+</button>
        </div>

        <button class="remove-btn" data-id="${p.id}">Remove</button>
      `;
      favoritesGrid.appendChild(card);
    });

    // Wire up qty and remove
    favoritesGrid.querySelectorAll(".qty-btn.inc").forEach((b) =>
      b.addEventListener("click", () => changeQty(parseInt(b.getAttribute("data-id")), +1))
    );
    favoritesGrid.querySelectorAll(".qty-btn.dec").forEach((b) =>
      b.addEventListener("click", () => changeQty(parseInt(b.getAttribute("data-id")), -1))
    );
    favoritesGrid.querySelectorAll(".remove-btn").forEach((b) =>
      b.addEventListener("click", () => removeFavorite(parseInt(b.getAttribute("data-id"))))
    );
  }

  function changeQty(id, delta) {
    const favorites = loadFavorites();
    const item = favorites.find((f) => f.id === id);
    if (!item) return;
    item.qty = Math.max(1, (item.qty || 1) + delta); // never below 1
    saveFavorites(favorites);
    renderFavorites();
  }

  function removeFavorite(id) {
    let favorites = loadFavorites();
    favorites = favorites.filter((f) => f.id !== id);
    saveFavorites(favorites);
    renderFavorites();
  }

  function sendToWhatsApp() {
    const favorites = loadFavorites();
    if (favorites.length === 0) {
      alert("No favorites selected!");
      return;
    }

    // Build message with absolute image URLs
    let message = "Hello, I’m interested in the following items:\n";
    message += "Asalam alaikum, I would like to order these products:\n";
    message += "Good day, please find my selected products below:\n\n";

    favorites.forEach((p) => {
      const qty = p.qty || 1;
      // Absolute URL that works both on localhost and when hosted
      const imageURL = new URL(p.image, window.location.href).href;
      message += `- ${p.name} (Quantity: ${qty})\n${imageURL}\n\n`;
    });

    // NOTE: WhatsApp won't make 127.0.0.1 links clickable. Host the site to get https links.
    const phone = "2347082798562"; // your number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  // Init
  renderFavorites();
  if (sendBtn) sendBtn.addEventListener("click", sendToWhatsApp);
});

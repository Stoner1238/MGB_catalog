// Load favorites from localStorage
const favoritesGrid = document.getElementById("favorites-grid");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Display favorites
function displayFavorites() {
  favoritesGrid.innerHTML = '';
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

  favorites.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:12px;">
      <h3>${product.name}</h3>
    `;
    favoritesGrid.appendChild(card);
  });
}

// Send order via WhatsApp
function sendToWhatsApp() {
  if (favorites.length === 0) {
    alert("No favorites selected!");
    return;
  }

  let message = "Hello, I’m interested in the following items:\n";
  message += "Asalam alaikum, I would like to order these products:\n";
  message += "Good day, please find my selected products below:\n\n";

  favorites.forEach((product) => {
    // Make sure we generate a full http:// link
    let imageLink = `${window.location.origin}/${product.image}`;
    message += `- ${product.name}\n${imageLink}\n\n`;
  });

  const phone = "2347082798562"; // your number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Run on load
displayFavorites();

// Attach WhatsApp button
document.getElementById("send-whatsapp").addEventListener("click", sendToWhatsApp);

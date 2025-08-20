// Load favorites from localStorage
const favoritesGrid = document.getElementById('favorites-grid');
let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
const noteInput = document.getElementById('order-note');
const sendBtn = document.getElementById('send-whatsapp');

function displayFavorites() {
  favoritesGrid.innerHTML = '';

  if (storedFavorites.length === 0) {
    favoritesGrid.innerHTML = '<p>No favorites selected yet.</p>';
    return;
  }

  storedFavorites.forEach((item, index) => {
    // Ensure quantity exists
    if (!item.quantity) item.quantity = 1;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:4px;">
      <h3>${item.name}</h3>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span class="qty">${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <button class="remove" data-index="${index}">Remove</button>
    `;
    favoritesGrid.appendChild(card);
  });

  // Increase quantity
  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      storedFavorites[idx].quantity++;
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      displayFavorites();
    });
  });

  // Decrease quantity
  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      if (storedFavorites[idx].quantity > 1) {
        storedFavorites[idx].quantity--;
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        displayFavorites();
      }
    });
  });

  // Remove item
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      if (confirm('Are you sure you want to remove this item from favorites?')) {
        storedFavorites.splice(idx, 1);
        localStorage.setItem('favorites', JSON.stringify(storedFavorites));
        displayFavorites();
      }
    });
  });
}

// Generate WhatsApp link with quantities
function generateWhatsAppLink() {
  if (storedFavorites.length === 0) {
    alert('No favorites selected!');
    return '#';
  }

  const greetings = `Hello, I’m interested in the following items:%0AAsalam alaikum, I would like to order these products:%0AGood day, please find my selected products below:%0A`;
  const note = noteInput.value.trim();

  const productList = storedFavorites
    .map(item => `- ${item.name} (Quantity: ${item.quantity})`)
    .join('%0A');

  const extraNote = note ? `%0A%0ANote: ${encodeURIComponent(note)}` : '';
  const message = `${greetings}%0A${productList}${extraNote}`;
  const phone = '2348026312854';

  return `https://wa.me/${phone}?text=${message}`;
}

// Send via WhatsApp
sendBtn.addEventListener('click', () => {
  const link = generateWhatsAppLink();
  if (link !== '#') window.open(link, '_blank');
});

// Initial display
displayFavorites();

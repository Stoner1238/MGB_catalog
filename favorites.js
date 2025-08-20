// Load favorites from localStorage
const favoritesGrid = document.getElementById('favorites-grid');
const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
const noteInput = document.getElementById('order-note');
const sendBtn = document.getElementById('send-whatsapp');

function displayFavorites() {
  favoritesGrid.innerHTML = '';

  if (storedFavorites.length === 0) {
    favoritesGrid.innerHTML = '<p>No favorites selected yet.</p>';
    return;
  }

  storedFavorites.forEach(item => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:4px;">
      <h3>${item.name}</h3>
    `;
    favoritesGrid.appendChild(card);
  });
}

function generateWhatsAppLink() {
  const greetings = `Hello, I’m interested in the following items:%0AAsalam alaikum, I would like to order these products:%0AGood day, please find my selected products below:%0A`;
  const note = noteInput.value.trim();

  const productList = storedFavorites.map(item => `- ${item.name}`).join('%0A');
  const extraNote = note ? `%0A%0ANote: ${encodeURIComponent(note)}` : '';

  const message = `${greetings}%0A${productList}${extraNote}`;
  const phone = '2348026312854';

  return `https://wa.me/${phone}?text=${message}`;
}

sendBtn.addEventListener('click', () => {
  const link = generateWhatsAppLink();
  window.open(link, '_blank');
});

displayFavorites();
// Remove from favorites with confirmation
function removeFromFavorites(id) {
  if (confirm('Are you sure you want to remove this item from favorites?')) {
    storedFavorites = storedFavorites.filter(item => item.id !== id);
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    displayFavorites();
  }
}

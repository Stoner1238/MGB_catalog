// Ensure script runs after DOM is loaded
window.onload = function() {
  const productGrid = document.getElementById('product-grid');

  // Create 50 products
  let products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      image: 'images/placeholder.png' // placeholder image
    });
  }

  // Load favorites from localStorage or initialize
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Function to display products
  function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:12px;">
        <h3>${product.name}</h3>
        <button class="fav-btn" data-id="${product.id}">Add to Favorites</button>
      `;
      productGrid.appendChild(card);
    });

    // Add event listeners to all buttons after rendering
    const buttons = document.querySelectorAll('.fav-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        addToFavorites(id);
      });
    });
  }

  // Function to add product to favorites
  function addToFavorites(id) {
    const item = products.find(p => p.id === id);
    if (!favorites.find(f => f.id === id)) {
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${item.name} added to favorites!`);
    } else {
      alert(`${item.name} is already in favorites.`);
    }
  }

  // Display products on page load
  displayProducts();
};
function displayFavorites() {
  favoritesGrid.innerHTML = '';
  if (favorites.length === 0) {
    favoritesGrid.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  favorites.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:12px;">
      <h3>${product.name}</h3>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span class="qty">${product.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
      <button class="remove" data-index="${index}">Remove</button>
    `;
    favoritesGrid.appendChild(card);
  });

  // Event listeners for increase/decrease
  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      favorites[idx].quantity++;
      localStorage.setItem('favorites', JSON.stringify(favorites));
      displayFavorites();
    });
  });

  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      if (favorites[idx].quantity > 1) {
        favorites[idx].quantity--;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
      }
    });
  });

  // Remove button
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-index');
      favorites.splice(idx, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      displayFavorites();
    });
  });
}

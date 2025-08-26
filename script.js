// Ensure script runs after DOM is loaded
window.onload = function () {
  const productGrid = document.getElementById('product-grid');

  // Create 50 products (no price, only name + image)
  let products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      image: `images/product${i}.jpg` // change to real product images later
    });
  }

  // Load favorites from localStorage or initialize
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Function to display products in catalog
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

    // Event listeners for all add-to-favorites buttons
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = parseInt(this.getAttribute('data-id'));
        addToFavorites(id);
      });
    });
  }

  // Add product to favorites
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

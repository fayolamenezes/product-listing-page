const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 64817, rating: 4.5, image: "/images/smartphone.jpg" },
  { id: 2, name: "T-shirt", category: "clothing", price: 1075, rating: 4.2, image: "images/tshirt.jpeg" },
  { id: 3, name: "Laptop", category: "electronics", price: 84617, rating: 4.8, image: "images/laptop.jpg" },
  { id: 4, name: "Book: JavaScript", category: "books", price: 735, rating: 4.6, image: "images/jsbook.jpeg" },
  { id: 5, name: "Jeans", category: "clothing", price: 2565, rating: 3.9, image: "images/jeans.jpg" },
  { id: 6, name: "Tablet", category: "electronics", price: 12450, rating: 4.3, image: "images/tablet.jpeg" },
  { id: 7, name: "Book: CSS Mastery", category: "books", price: 905, rating: 4.0, image: "images/cssbook.jpg" },
  { id: 8, name: "Jacket", category: "clothing", price: 4960, rating: 4.7, image: "images/jacket.jpg" },
  { id: 9, name: "Wireless Headphones", category: "electronics", price: 7707, rating: 4.6, image: "images/headphones.jpg" },
  { id: 10, name: "Bluetooth Speaker", category: "electronics", price: 6387, rating: 4.4, image: "images/speaker.jpg" },
  { id: 11, name: "Smartwatch", category: "electronics", price: 10517, rating: 4.3, image: "images/smartwatch.jpg" },
  { id: 12, name: "4K Monitor", category: "electronics", price: 20157, rating: 4.7, image: "images/monitor.jpg" },
  { id: 13, name: "Gaming Mouse", category: "electronics", price: 2897, rating: 4.5, image: "images/mouse.jpg" },
  { id: 14, name: "Hoodie", category: "clothing", price: 3735, rating: 4.2, image: "images/hoodie.jpg" },
  { id: 15, name: "Sneakers", category: "clothing", price: 9130, rating: 4.8, image: "images/sneakers.jpeg" },
  { id: 16, name: "Formal Shirt", category: "clothing", price: 2980, rating: 4.1, image: "images/formalshirt.jpg" },
  { id: 17, name: "Summer Dress", category: "clothing", price: 2025, rating: 4.3, image: "images/dress.jpeg" },
  { id: 18, name: "Sportswear Set", category: "clothing", price: 3470, rating: 4.6, image: "images/sportswear.jpeg" },
  { id: 19, name: "HTML & CSS for Beginners", category: "books", price: 490, rating: 4.5, image: "images/htmlcss.jpg" },
  { id: 20, name: "Learn Python the Hard Way", category: "books", price: 450, rating: 4.7, image: "images/python.jpg" },
  { id: 21, name: "Atomic Habits", category: "books", price: 305, rating: 4.8, image: "images/atomichabits.jpg" },
  { id: 22, name: "Deep Work", category: "books", price: 324, rating: 4.6, image: "images/deepwork.jpg" },
  { id: 23, name: "Design Patterns in JS", category: "books", price: 320, rating: 4.2, image: "images/designpatterns.jpg" },
  { id: 24, name: "Air Fryer", category: "home", price: 12450, rating: 4.6, image: "images/airfryer.jpg" },
  { id: 25, name: "Coffee Maker", category: "home", price: 7885, rating: 4.3, image: "images/coffeemaker.jpg" },
  { id: 26, name: "Blender", category: "home", price: 5810, rating: 4.1, image: "images/blender.jpg" },
  { id: 27, name: "Cookware Set", category: "home", price: 5960, rating: 4.4, image: "images/cookware.jpg" },
  { id: 28, name: "Essential Oil Diffuser", category: "home", price: 2320, rating: 4.5, image: "images/diffuser.jpg" },
  { id: 29, name: "Yoga Mat", category: "fitness", price: 1005, rating: 4.3, image: "images/yogamat.jpg" },
  { id: 30, name: "Dumbbell Set", category: "fitness", price: 2055, rating: 4.7, image: "images/dumbbells.jpg" },
  { id: 31, name: "Treadmill", category: "fitness", price: 50017, rating: 4.5, image: "images/treadmill.jpg" },
  { id: 32, name: "Water Bottle", category: "fitness", price: 1494, rating: 4.0, image: "images/waterbottle.jpg" },
  { id: 33, name: "Fitness Tracker", category: "fitness", price: 5217, rating: 4.2, image: "images/tracker.jpeg" }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOptions = document.getElementById("sortOptions");
const searchInput = document.getElementById("searchInput");
const clearFilters = document.getElementById("clearFilters");

let currentPage = 1;
const itemsPerPage = 8;

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return;

  // Previous Button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    currentPage--;
    filterAndSortProducts();
  });
  pagination.appendChild(prevBtn);

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = i === currentPage ? "active-page" : "";
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      filterAndSortProducts();
    });
    pagination.appendChild(pageBtn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    currentPage++;
    filterAndSortProducts();
  });
  pagination.appendChild(nextBtn);
}


function displayProducts(filteredProducts) {
  const resultsCount = document.getElementById("resultsCount");
  const pagination = document.getElementById("pagination");
  productList.innerHTML = "";

  resultsCount.textContent = `${filteredProducts.length} product(s) found`;

  if (filteredProducts.length === 0) {
    pagination.innerHTML = "";
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  paginatedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
      <p>Rating: ${product.rating} ⭐</p>
    `;
    productList.appendChild(card);
  });

  renderPagination(filteredProducts.length);
}


function filterAndSortProducts() {

  // Save filters to localStorage
  localStorage.setItem("categoryFilter", categoryFilter.value);
  localStorage.setItem("priceFilter", priceFilter.value);
  localStorage.setItem("sortOptions", sortOptions.value);
  localStorage.setItem("searchInput", searchInput.value);

  let filtered = [...products];

  const category = categoryFilter.value;
  const price = priceFilter.value;
  const sort = sortOptions.value;
  const searchQuery = searchInput.value.toLowerCase();

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (price !== "all") {
    if (price === "0-4000") filtered = filtered.filter((p) => p.price <= 4000);
    else if (price === "4000-8000") filtered = filtered.filter((p) => p.price > 4000 && p.price <= 8000);
    else if (price === "8000+") filtered = filtered.filter((p) => p.price > 8000);
  }

  if (searchQuery) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery));
  }

  if (sort === "priceAsc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "priceDesc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "ratingDesc") filtered.sort((a, b) => b.rating - a.rating);

  displayProducts(filtered);
}

currentPage = 1;

categoryFilter.addEventListener("change", filterAndSortProducts);
priceFilter.addEventListener("change", filterAndSortProducts);
sortOptions.addEventListener("change", filterAndSortProducts);
searchInput.addEventListener("input", filterAndSortProducts);

clearFilters.addEventListener("click", () => {
  categoryFilter.value = "all";
  priceFilter.value = "all";
  sortOptions.value = "default";
  searchInput.value = "";

  // Clear localStorage
  localStorage.removeItem("categoryFilter");
  localStorage.removeItem("priceFilter");
  localStorage.removeItem("sortOptions");
  localStorage.removeItem("searchInput");

  displayProducts(products);
});

// Restore filters from localStorage on load
window.addEventListener("DOMContentLoaded", () => {
  const savedCategory = localStorage.getItem("categoryFilter");
  const savedPrice = localStorage.getItem("priceFilter");
  const savedSort = localStorage.getItem("sortOptions");
  const savedSearch = localStorage.getItem("searchInput");

  if (savedCategory) categoryFilter.value = savedCategory;
  if (savedPrice) priceFilter.value = savedPrice;
  if (savedSort) sortOptions.value = savedSort;
  if (savedSearch) searchInput.value = savedSearch;

  filterAndSortProducts();
});

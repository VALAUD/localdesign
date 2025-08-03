// DOM Elements
const sellersContainer = document.getElementById('sellersContainer');
const styleFilter = document.getElementById('styleFilter');
const serviceFilter = document.getElementById('serviceFilter');
const locationFilter = document.getElementById('locationFilter');
const ratingFilter = document.getElementById('ratingFilter');
const searchButton = document.getElementById('searchButton');
const sortBy = document.getElementById('sortBy');
const resultsCount = document.getElementById('resultsCount');
const pagination = document.getElementById('pagination');

// State
let currentPage = 1;
const sellersPerPage = 9;
let allSellers = [];
let filteredSellers = [];

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadFilters();
  await loadSellers();
  setupEventListeners();
});

// Load filter options
async function loadFilters() {
  try {
    const [stylesRes, servicesRes] = await Promise.all([
      fetch('/api/enums/style_types'),
      fetch('/api/enums/service_types')
    ]);
    
    const styles = await stylesRes.json();
    const services = await servicesRes.json();
    
    // Populate style filter
    styles.forEach(style => {
      const option = document.createElement('option');
      option.value = style;
      option.textContent = formatEnumForDisplay(style);
      styleFilter.appendChild(option);
    });
    
    // Populate service filter
    services.forEach(service => {
      const option = document.createElement('option');
      option.value = service;
      option.textContent = formatEnumForDisplay(service);
      serviceFilter.appendChild(option);
    });
    
  } catch (error) {
    console.error('Error loading filters:', error);
  }
}

// Load sellers data
async function loadSellers() {
  try {
    const response = await fetch('/api/sellers');
    allSellers = await response.json();
    filteredSellers = [...allSellers];
    updateResults();
  } catch (error) {
    console.error('Error loading sellers:', error);
  }
}

// Update results based on filters
function updateResults() {
  // Apply filters
  filteredSellers = allSellers.filter(seller => {
    const styleMatch = !styleFilter.value || seller.styles.includes(styleFilter.value);
    const serviceMatch = !serviceFilter.value || seller.services.includes(serviceFilter.value);
    const ratingMatch = seller.rating >= parseInt(ratingFilter.value);
    const locationMatch = !locationFilter.value || 
      seller.city.toLowerCase().includes(locationFilter.value.toLowerCase()) || 
      seller.country.toLowerCase().includes(locationFilter.value.toLowerCase());
    
    return styleMatch && serviceMatch && ratingMatch && locationMatch;
  });
  
  // Apply sorting
  applySorting();
  
  // Update count
  resultsCount.textContent = filteredSellers.length;
  
  // Display results
  displaySellers();
  setupPagination();
}

// Sort sellers
function applySorting() {
  const sortValue = sortBy.value;
  
  filteredSellers.sort((a, b) => {
    if (sortValue === 'rating') return b.rating - a.rating;
    if (sortValue === 'distance') return a.distance - b.distance;
    if (sortValue === 'name') return a.name.localeCompare(b.name);
    return 0;
  });
}

// Display sellers
function displaySellers() {
  sellersContainer.innerHTML = '';
  
  const startIndex = (currentPage - 1) * sellersPerPage;
  const endIndex = startIndex + sellersPerPage;
  const paginatedSellers = filteredSellers.slice(startIndex, endIndex);
  
  if (paginatedSellers.length === 0) {
    sellersContainer.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i class="fas fa-search fa-3x text-gray-300 mb-4"></i>
        <h3 class="text-lg font-medium text-gray-700">No sellers found</h3>
        <p class="text-gray-500 mt-2">Try adjusting your search filters</p>
      </div>
    `;
    return;
  }
  
  paginatedSellers.forEach(seller => {
    const sellerCard = document.createElement('seller-card');
    sellerCard.setAttribute('data-seller', JSON.stringify(seller));
    sellersContainer.appendChild(sellerCard);
  });
}

// Setup pagination
function setupPagination() {
  pagination.innerHTML = '';
  const pageCount = Math.ceil(filteredSellers.length / sellersPerPage);
  
  if (pageCount <= 1) return;
  
  // Previous button
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.className = 'pagination-btn px-3 py-1 rounded-l-md border border-gray-300';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    currentPage--;
    displaySellers();
    setupPagination();
  });
  pagination.appendChild(prevBtn);
  
  // Page buttons
  for (let i = 1; i <= pageCount; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.className = `pagination-btn px-3 py-1 border-t border-b border-gray-300 ${currentPage === i ? 'active' : ''}`;
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      displaySellers();
      setupPagination();
    });
    pagination.appendChild(pageBtn);
  }
  
  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.className = 'pagination-btn px-3 py-1 rounded-r-md border border-gray-300';
  nextBtn.disabled = currentPage === pageCount;
  nextBtn.addEventListener('click', () => {
    currentPage++;
    displaySellers();
    setupPagination();
  });
  pagination.appendChild(nextBtn);
}

// Event listeners
function setupEventListeners() {
  searchButton.addEventListener('click', () => {
    currentPage = 1;
    updateResults();
  });
  
  sortBy.addEventListener('change', updateResults);
  
  // Allow Enter key to trigger search
  [styleFilter, serviceFilter, locationFilter, ratingFilter].forEach(filter => {
    filter.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        currentPage = 1;
        updateResults();
      }
    });
  });
}

// Helper function to format enum values for display
function formatEnumForDisplay(enumValue) {
  return enumValue
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
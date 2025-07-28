// Toggle mobile menu (if needed later)
document.addEventListener('DOMContentLoaded', () => {
  console.log('Website loaded!');
});

// Development-only mock auth
if (window.location.href.includes('localhost')) {
  console.log('Development mode - mock auth enabled');
  
  // Store mock user in sessionStorage
  sessionStorage.setItem('dev_user', JSON.stringify({
    id: 123,
    name: "Dev Seller",
    type: "seller",
    email: "dev@seller.com"
  }));
  
  // Check auth on protected pages
  function checkAuth() {
    if (!sessionStorage.getItem('dev_user')) {
      console.log('Not authenticated - redirecting to login');
      window.location.href = '/login.html';
    }
    return JSON.parse(sessionStorage.getItem('dev_user'));
  }
  
  // Mock logout
  window.mockLogout = function() {
    sessionStorage.removeItem('dev_user');
    window.location.href = '/login.html';
  }
}
require('dotenv').config(); // Load environment variables
const app = require('./app'); // Import the new app configuration

const PORT = process.env.PORT || 3000; // Use .env or default

// Keep all your existing frontend serving logic
const express = require('express');
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `../frontend${req.path}.html`), (err) => {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Try these URLs:');
  console.log(`- Homepage: http://localhost:${PORT}`);
  console.log(`- Seller Profile: http://localhost:${PORT}/seller/profile`);
});
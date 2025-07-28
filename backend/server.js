const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../frontend')));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Catch-all route for other HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, `../frontend${req.path}.html`), (err) => {
    if (err) {
      res.status(404).send('Page not found');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Try these URLs:');
  console.log(`- Homepage: http://localhost:${PORT}`);
  console.log(`- Seller Profile: http://localhost:${PORT}/seller/profile`);
});
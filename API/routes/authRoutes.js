const express = require('express');
const app = express();
const authRoutes = express.Router();
const router = express.Router();

// Import your routes
module.exports = router;
// Use the routes
app.use('/auth', authRoutes);

app.post('/register', (req, res) => {
    res.send('Registration route works.');
  });

  router.use('/some-path', (req, res, next) => {
    // Logika middleware
    next(); // Penting untuk memanggil next() untuk melanjutkan eksekusi
  });
router.post('/register', (req, res) => {
    console.log('Received a POST request to /register');
    // Your registration logic here
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

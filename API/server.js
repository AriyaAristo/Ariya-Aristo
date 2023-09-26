const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB (you need to have MongoDB installed locally or provide a connection URL)
mongoose.connect('mongodb://localhost/auth-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];
// Secret key for JWT
const secretKey = 'YourSecretKey';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.json({ message: 'Registration successful' });
});

app.get('/login', (req, res) => {
  // Mengirimkan berkas HTML halaman login ke peramban
  res.sendFile(__dirname + '/public/login.html');
});

// Register a new user
app.post('/login', (req, res) => {
  // Retrieve username and password from the request body
  const { username, password } = req.body;

  // Perform authentication logic here (e.g., check against a database)
  // Replace this with your actual authentication logic

  if (username === 'exampleUser' && password === 'examplePassword') {
    // Authentication successful
    res.json({ message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Login and get access and refresh tokens
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ username: user.username }, secretKey);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route (requires access token)
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your profile', username: req.user.username });
});

// Middleware to verify access token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

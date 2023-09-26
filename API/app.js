const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'mycollection';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Define the route for user registration
app.post('/register', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Check if the username already exists
    const existingUser = await collection.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a user object
    const user = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    };

    // Insert the user into the database
    const result = await collection.insertOne(user);

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

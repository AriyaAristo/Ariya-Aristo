const { MongoClient } = require('mongodb');

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'users';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  
  // You can perform database operations here
});

function registerUser(client, user) {
    const db = client.db(dbName);
    const collection = db.collection('users');
  
    collection.insertOne(user, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return;
      }
      console.log('User registered successfully');
    });
  }
  
  // Usage example
  const newUser = {
    username: 'exampleuser',
    password: 'password123',
    email: 'example@example.com',
  };
  
  // Call the registerUser function
  registerUser(client, newUser);

  client.close((err) => {
    if (err) {
      console.error('Error closing MongoDB connection:', err);
    } else {
      console.log('MongoDB connection closed');
    }
  });
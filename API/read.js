const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "hitungan";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

async function findDocuments() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database
    const db = client.db(dbName);

    // Specify the collection
    const collection = db.collection("mycollection");

    // Find all documents in the collection
    const documents = await collection.find({}).toArray();
    console.log("Found documents:");
    console.log(documents);
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Call the findDocuments function
findDocuments();

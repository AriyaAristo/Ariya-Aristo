const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "hitungan";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

async function insertDocument() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database
    const db = client.db(dbName);

    // Specify the collection
    const collection = db.collection("mycollection");

    // Document to be inserted
    const document = { name: "Ariya", age: 22 };

    // Insert a single document
    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Call the insertDocument function
insertDocument();

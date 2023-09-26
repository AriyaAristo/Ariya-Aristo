const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "hitungan";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

async function updateDocument() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database
    const db = client.db(dbName);

    // Specify the collection
    const collection = db.collection("mycollection");

    // Update a document based on its _id
    const query = { _id: new ObjectId("your_document_id_here") };
    const update = { $set: { age: 31 } };
    const result = await collection.updateOne(query, update);

    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Call the updateDocument function
updateDocument();

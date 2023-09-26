const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "hitungan";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

async function deleteDocument() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Specify the database
    const db = client.db(dbName);

    // Specify the collection
    const collection = db.collection("mycollection");

    // Delete a document based on its _id
    const query = { _id: new ObjectId("your_document_id_here") };
    const result = await collection.deleteOne(query);

    console.log(`Deleted ${result.deletedCount} document(s)`);
  } finally {
    // Close the client connection
    await client.close();
  }
}

// Call the deleteDocument function
deleteDocument();

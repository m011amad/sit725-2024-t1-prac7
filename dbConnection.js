const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mnia:SStQ8ooSKbFNodDQ@cluster0.9lpfauh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // MongoDB URI

let collection;

async function connectToMongoDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('Cluster0'); 
  collection = db.collection('SIT');
  console.log("Connected to MongoDB");
  return collection;
}

module.exports = connectToMongoDB;

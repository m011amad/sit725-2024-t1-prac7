const connectToMongoDB = require('../dbConnection');

let collection;

async function initializeCollection() {
  collection = await connectToMongoDB();
}

async function postCard(card) {
  await collection.insertOne(card);
}

async function getAllCards() {
  return await collection.find().toArray();
}

module.exports = {
  initializeCollection,
  postCard,
  getAllCards
};

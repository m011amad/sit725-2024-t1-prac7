// const express = require("express");
// const { MongoClient } = require('mongodb');
// const app = express();
// const port = process.env.PORT || 3000;
// let collection;

// // Setting Up Express App
// app.use(express.static(__dirname + '/public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const uri = "mongodb+srv://mnia:SStQ8ooSKbFNodDQ@cluster0.9lpfauh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri);

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     const db = client.db('Cluster0'); // Replace 'your_database_name' with your actual database name
//     collection = db.collection('SIT');
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Exit the process if unable to connect to MongoDB
//   }
// }

// Defining Routes

// Root route serves the index.html file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// // GET route to fetch all cards from the database
// app.get('/api/cards', async (req, res) => {
//   try {
//     const cards = await getAllCards();
//     res.json({ statusCode: 200, data: cards, message: 'get all cards success' });
//   } catch (error) {
//     console.error("Error fetching cards:", error);
//     res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
//   }
// });

// // POST route to add a new card to the database
// app.post('/api/cards', async (req, res) => {
//   try {
//     const newCard = req.body; // Assuming request body contains the new card data
//     await postCard(newCard);
//     res.status(201).json({ statusCode: 201, message: 'New card added successfully' });
//   } catch (error) {
//     console.error("Error adding new card:", error);
//     res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
//   }
// });

// // Database Operations Functions

// // Inserts a new card document into the MongoDB collection
// async function postCard(card) {
//   await collection.insertOne(card);
// }

// // Fetches all card documents from the MongoDB collection
// async function getAllCards() {
//   return await collection.find().toArray();
// }

// // Start the server and connect to MongoDB
// async function startServer() {
//   await connectToMongoDB();
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
// }

// startServer();

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;
// const router = require("./routes/routes");
// const controller = require("./controllers/controller");

// app.use(express.static(__dirname + "/public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/", router);

// async function startServer() {
//   await controller.initializeCollection();
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
// }
// module.exports = app;
// startServer();

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const router = require("./routes/routes");
const controller = require("./controllers/controller");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io/client-dist/socket.io.js");
});

app.use("/", router);

async function startServer() {
  await controller.initializeCollection();
  http.listen(3000, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.get("/favicon.ico", (req, res) => res.status(204));

async function startServer() {
  try {
    await controller.initializeCollection();
    http.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

io.on("connection", (socket) => {
  console.log("A client connected");
  setInterval(() => {
    socket.emit("randomNumber", Math.random());
  }, 1000);
});

module.exports = app;
startServer();
